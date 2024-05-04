# Author:       Major Schwartz
# Application:  Gupiteer
# Description:  Backend server for Gupiteer, a chatbot application that uses large language models (LLMs) to generate responses to user input.
#               This server is built using Flask, and uses the OpenAI, Google, and Anthropic APIs to generate responses.


# Libraries


import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from pymongo import MongoClient
import bcrypt
import datetime
from openai import OpenAI
import google.generativeai as genai
from dotenv import load_dotenv
import anthropic
import hashlib
import pathlib
import textwrap
import json
import os


# Backend setup


load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('APP_SECRET_KEY')
CORS(app)

client = MongoClient(os.getenv('MONGO_URI'))
database = client[os.getenv('MONGO_USER_DB')]
collection = database[os.getenv('MONGO_USER_COLLECTION')]


# Helper functions


def print_request(request):
    print(f"\n| Model: {request['model']}\n| Evaluate: {request['evaluate']}\n| Prompt: {request['prompt']}\n| Chat Count: {len(request['respList'])}\n| Keys: {request['keys']}\n")

def check_special(keys):
    available_special_keys = ['fd6726729c81f4cbbf96fd37b93f28fc', 'f5d2cdd3f52f7c854c084c72742b2387', 'a1c7b80dcb74c12dceb34670a4e018c7']
    key_list = ['openai-key', 'gemini-key', 'anthropic-key']
    for i in range(len(key_list)):
        if str(hashlib.md5(keys[i][key_list[i]].encode()).hexdigest()) in available_special_keys:
            keys[0]['openai-key'] = os.getenv('OPENAI_KEY_SPECIAL')
            keys[1]['gemini-key'] = os.getenv('GEMINI_KEY_SPECIAL')
            keys[2]['anthropic-key'] = os.getenv('ANTHROPIC_KEY_SPECIAL')
    return keys


# LLM prompting


def prompt_gpt(model="gpt-3.5-turbo", evaluation=False, prompt="", respList=[], keys=None):
    
    # To add: Sending data to database for storing chat history and conversations
    
    try:
        keys = check_special(keys)
        # Getting context
        
        super_context = "You are a chatbot. I will provide previous chat content below from our conversation. **IMPORTANT: DO NOT ADD PREFIXES TO YOUR RESPONSE (I.E. 'GPT Response', or 'Response'). ONLY RESPOND WITH YOUR RESPONSE AND NO PREFIX.**\n\n"
        previous_context = "Previous chat content:\n"
        if len(respList) > 0:
            for i in range(len(respList)):
                if respList[i]['user']:
                    previous_context += f"*User*: " + respList[i]['response'] + "\n"
                else:
                    previous_context += f"*GPT*: " + respList[i]['response'] + "\n"

        print(previous_context)
        total_context = super_context + previous_context + "\nNew Prompt: " + prompt

        # Getting response

        # OpenAI
        if model in ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-32k', 'gpt-4-0125-preview']:
            openai_key = keys[0]['openai-key']

            openaiClient = OpenAI(api_key=openai_key)
            
            completion = openaiClient.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": total_context,
                    }
                ],
                model=model
            )
            response = completion.choices[0].message.content
        
        # Google
        elif model in ['google-gemini']:
            genai.configure(api_key=keys[1]['gemini-key'])

            gemini = genai.GenerativeModel('gemini-pro')
            completion = gemini.generate_content(total_context)

            response = completion.text
        
        # Anthropic
        elif model in ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307']:
            client = anthropic.Anthropic(
                api_key=keys[2]['anthropic-key'],
            )
            
            completion = client.messages.create(
                model=model,
                max_tokens=512,
                messages=[
                    {
                        "role": "user",
                        "content": total_context,
                    }
                ]
            )
            response = completion.content[0].text

        generated_response = {'user': False, 'response': response, 'eval_score': 0, 'model': model}
        
    except Exception as e:
        error_response = {'user': False, 'response': 'An error has occurred. Make sure you\'ve entered a valid API key, and try again.', 'eval_score': 0, 'model': model}
        final_list = respList.copy()
        final_list.append(error_response)
        return final_list

    print(f"Generated response:\n{generated_response['response']}\n")
    
    final_list = respList.copy()
    final_list.append(generated_response)
    return final_list


# API routes


# LLM request route
@app.route('/api/submit', methods=['POST'])
def submit_data():
    try:
        data = request.get_json()
        model = data.get('model', 'gpt-3.5-turbo')
        evaluate = data.get('evaluate', False)
        prompt = data.get('prompt', '')
        respList = data.get('respList')
        keys = data.get('keys')

        print_request({ "model": model, "evaluate": evaluate, "prompt": prompt, "respList": respList, "keys": keys })

        gen_response = prompt_gpt(model, evaluate, prompt, respList, keys)
        return jsonify(gen_response)
    except Exception as e:
        print(e)
        return e

# Register route
@app.route('/register', methods=['POST'])
def register():
    print(f"Registering user: {request.get_json()}\n")

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Invalid email or password."}), 400
    
    existing_user = collection.find_one({'email': email})

    if existing_user:
        return jsonify({"error": "Email already exists."}), 409
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    collection.insert_one({'email': email, 'password': hashed_password})
    
    return jsonify({"message": "User created successfully."}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    print(f"Logging in user: {request.get_json()}\n")

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Invalid credentials.'}), 401
    
    user = collection.find_one({'email': email})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({
            'email': email,
            'iat': datetime.datetime.now(datetime.UTC),
            'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=24)
        }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token}), 200
    return jsonify({'error': 'Invalid credentials.'}), 401


# Running the app


if __name__ == '__main__':
    app.run(debug=True)