import time
# from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
# import google.generativeai as genai
import hashlib
import pathlib
import textwrap
import json
import os

app = Flask(__name__)
CORS(app)

# load_dotenv()

# genai.configure(api_key=os.getenv(""))

def prompt_gpt(model="gpt-3.5-turbo", evaluation=False, prompt="", respList=[], keys=None):
    openai_key = keys[0]['openai-key']
    print(openai_key)

    available_special_keys = ["ecb7467312cc20314a7cc354a054645f", "f29aad24e8f9e65587ff758ff92bb74d"]

    if (str(hashlib.md5(openai_key.encode()).hexdigest()) in available_special_keys):
        openai_key = os.getenv("OPENAI_KEY_SPECIAL")

    openaiClient = OpenAI(api_key=openai_key)

    try:
        given_model = "gpt-3.5-turbo"
        super_context = "You are a chatbot. I will provide previous chat content below from our conversation. **IMPORTANT: DO NOT ADD PREFIXES TO YOUR RESPONSE (I.E. 'GPT Response', or 'Response'). ONLY RESPOND WITH YOUR RESPONSE AND NO PREFIX.**\n\n"
        previous_context = "Previous chat content:\n"
        if len(respList) > 0:
            for i in range(len(respList)):
                if respList[i]['user']:
                    previous_context += f"*User*: " + respList[i]['response'] + "\n"
                else:
                    previous_context += f"*GPT*: " + respList[i]['response'] + "\n"

        print(previous_context)

        if model in ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-32k', 'gpt-4-0125-preview']:
            completion = openaiClient.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": super_context + previous_context + "\nNew Prompt: " + prompt,
                    }
                ],
                model=model
            )
            response = completion.choices[0].message.content
        
        # JUST AS DEMO!
            # Implement
        elif model in ['mistral-7b', 'google-gemini']:
            # Future completion project!
            completion = openaiClient.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": super_context + previous_context + "\nNew Prompt: " + prompt,
                    }
                ],
                model=given_model
            )
            response = completion.choices[0].message.content
        # This is just an OpenAI grab right now!

        generated_response = {'user': False, 'response': response, 'eval_score': 0, 'model': model}

        # Handle evaluation
        # Write under
        
    except Exception as e:
        error_response = {'user': False, 'response': 'An error has occurred. Make sure you\'ve entered a valid API key, and try again.', 'eval_score': 0, 'model': model}
        final_list = respList.copy()
        final_list.append(error_response)
        return final_list

    print(generated_response)
    
    final_list = respList.copy()
    final_list.append(generated_response)
    return final_list

@app.route('/api/submit', methods=['POST'])
def submit_data():
    try:
        data = request.get_json()
        model = data.get('model', 'gpt-3.5-turbo')
        evaluate = data.get('evaluate', False)
        prompt = data.get('prompt', '')
        respList = data.get('respList')
        keys = data.get('keys')

        print(respList)
        gen_response = prompt_gpt(model, evaluate, prompt, respList, keys)
        return jsonify(gen_response)
    except Exception as e:
        print(e)
        return e

if __name__ == '__main__':
    app.run(debug=True)