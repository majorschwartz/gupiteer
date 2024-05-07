# Author:       Major Schwartz
# Application:  Gupiteer
# Description:  Backend server for Gupiteer, a chatbot application that uses large language models (LLMs) to generate responses to user input.
#               This server is built using Flask, and uses the OpenAI, Google, and Anthropic APIs to generate responses.


### Libraries


from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from pymongo import MongoClient
import bcrypt
import datetime
from openai import OpenAI
import google.generativeai as genai
from dotenv import load_dotenv
import anthropic
import hashlib
import os
from decorators.decorators import token_required
from bson.objectid import ObjectId


### Backend setup


load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("APP_SECRET_KEY")
CORS(app, resources={r"*": {"origins": os.getenv("ORIGIN_ENDPOINT")}})

client = MongoClient(os.getenv("MONGO_URI"))
database = client[os.getenv("MONGO_DB")]
user_collection = database["users"]
chat_collection = database["chats"]


### Helper functions


def print_request(request):
    print(
        f"\n| Model: {request['model']}\n| Prompt: {request['prompt']}\n| Chat Count: {len(request['respList'])}\n| Keys: {request['keys']}\n"
    )


def check_special(keys):
    available_special_keys = [
        "fd6726729c81f4cbbf96fd37b93f28fc",
        "f5d2cdd3f52f7c854c084c72742b2387",
        "a1c7b80dcb74c12dceb34670a4e018c7",
    ]
    for key in keys:
        if (
            keys[key]
            and str(hashlib.md5(keys[key].encode()).hexdigest())
            in available_special_keys
        ):
            return {
                "openai-key": os.getenv("OPENAI_KEY_SPECIAL"),
                "gemini-key": os.getenv("GEMINI_KEY_SPECIAL"),
                "anthropic-key": os.getenv("ANTHROPIC_KEY_SPECIAL"),
            }
    return keys


def update_api_keys(user_id, keys):
    user_collection.update_one({"_id": user_id}, {"$set": {"api_keys": keys}})


### Main LLM prompting


def prompt_gpt(model="gpt-3.5-turbo", prompt="", respList=[], keys=None):
    try:
        keys = check_special(keys)

        super_context = "You are a chatbot. I will provide previous chat content below from our conversation. **IMPORTANT: DO NOT ADD PREFIXES TO YOUR RESPONSE (I.E. 'GPT Response', or 'Response'). ONLY RESPOND WITH YOUR RESPONSE AND NO PREFIX.**\n\n"
        previous_context = "Previous chat content:\n"
        if len(respList) > 0:
            for i in range(len(respList)):
                if respList[i]["user"]:
                    previous_context += f"*User*: " + respList[i]["response"] + "\n"
                else:
                    previous_context += f"*System*: " + respList[i]["response"] + "\n"

        print(previous_context)
        total_context = super_context + previous_context + "\nNew Prompt: " + prompt

        # Getting response

        # OpenAI
        if model in ["gpt-3.5-turbo", "gpt-4", "gpt-4-32k", "gpt-4-0125-preview"]:
            openai_key = keys["openai-key"]

            openaiClient = OpenAI(api_key=openai_key)

            completion = openaiClient.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": total_context,
                    }
                ],
                model=model,
            )
            response = completion.choices[0].message.content

        # Google
        elif model in ["google-gemini"]:
            genai.configure(api_key=keys["gemini-key"])

            gemini = genai.GenerativeModel("gemini-pro")
            completion = gemini.generate_content(total_context)

            response = completion.text

        # Anthropic
        elif model in [
            "claude-3-opus-20240229",
            "claude-3-sonnet-20240229",
            "claude-3-haiku-20240307",
        ]:
            client = anthropic.Anthropic(
                api_key=keys["anthropic-key"],
            )

            completion = client.messages.create(
                model=model,
                max_tokens=512,
                messages=[
                    {
                        "role": "user",
                        "content": total_context,
                    }
                ],
            )
            response = completion.content[0].text

        generated_response = {"user": False, "response": response, "model": model}

    except Exception as e:
        error_response = {
            "user": False,
            "response": "An error has occurred. Make sure you've entered a valid API key, and try again.",
            "model": model,
        }
        final_list = respList.copy()
        final_list.append(error_response)
        return final_list

    print(f"Generated response:\n{generated_response['response']}\n")

    final_list = respList.copy()
    final_list.append(generated_response)
    return final_list


### Key routes


# Update keys route
@app.route("/update-keys", methods=["POST"])
@token_required()
def update_keys(current_user):
    try:
        data = request.get_json()
        keys = data.get("keys")
        update_api_keys(current_user["_id"], keys)
        return jsonify({"message": "API keys updated successfully."}), 200
    except Exception as e:
        print(e)
        return e


# Get keys route
@app.route("/get-keys", methods=["GET"])
@token_required()
def get_keys(current_user):
    try:
        user = user_collection.find_one({"_id": current_user["_id"]})
        keys = user.get("api_keys")
        return jsonify({"keys": keys}), 200
    except Exception as e:
        print(e)
        return e


### Chat routes


# Create chat route
@app.route("/chat/create", methods=["POST"])
@token_required()
def create_chat(current_user):
    try:
        new_chat = {
            "user_id": current_user["_id"],
            "created_at": datetime.datetime.now(datetime.UTC),
            "chat": [],
        }
        chat_id = chat_collection.insert_one(new_chat).inserted_id
        return jsonify({"chat_id": str(chat_id)}), 201
    except Exception as e:
        return jsonify({"error": "Failed to create chat."}), 400


# Get chats route
@app.route("/chats", methods=["GET"])
@token_required()
def get_chats(current_user):
    chats = list(chat_collection.find({"user_id": current_user["_id"]}))
    for chat in chats:
        chat["_id"] = str(chat["_id"])
    return jsonify({"chats": chats})


# Get specific chat route
@app.route("/chat/<chat_id>", methods=["GET"])
@token_required()
def get_chat(current_user, chat_id):
    chat = chat_collection.find_one({"_id": ObjectId(chat_id)})
    if chat:
        if chat["user_id"] != current_user["_id"]:
            return jsonify({"error": "Unauthorized access."}), 401
        chat["_id"] = str(chat["_id"])
        return jsonify(chat)
    return jsonify({"error": "Chat not found."}), 404


# LLM request route
@app.route("/submit", methods=["POST"])
@token_required(optional=True)
def submit_data(current_user=None):
    try:
        data = request.get_json()
        model = data.get("model", "gpt-3.5-turbo")
        prompt = data.get("prompt", "")
        respList = data.get("respList")
        keys = data.get("keys")

        if current_user:
            update_api_keys(current_user["_id"], keys)

        print_request(
            {"model": model, "prompt": prompt, "respList": respList, "keys": keys}
        )

        gen_response = prompt_gpt(model, prompt, respList, keys)

        return jsonify(gen_response)
    except Exception as e:
        print(e)
        return e


### Login / register routes


# Register route
@app.route("/register", methods=["POST"])
def register():
    print(f"Registering user: {request.get_json()}\n")

    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Invalid email or password."}), 400

    existing_user = user_collection.find_one({"email": email})

    if existing_user:
        return jsonify({"error": "Email already exists."}), 409

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    user_collection.insert_one(
        {
            "email": email,
            "password": hashed_password,
            "api_keys": {"openai-key": "", "gemini-key": "", "anthropic-key": ""},
        }
    )

    return jsonify({"message": "User created successfully."}), 201


# Login route
@app.route("/login", methods=["POST"])
def login():
    print(f"Logging in user: {request.get_json()}\n")

    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Invalid credentials."}), 401

    user = user_collection.find_one({"email": email})

    if user and bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        token = jwt.encode(
            {
                "email": email,
                "iat": datetime.datetime.now(datetime.UTC),
                "exp": datetime.datetime.now(datetime.UTC)
                + datetime.timedelta(hours=24),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )

        return jsonify({"token": token}), 200
    return jsonify({"error": "Invalid credentials."}), 401


# Get email route
@app.route("/email", methods=["GET"])
@token_required()
def get_email(current_user):
    return jsonify({"email": current_user["email"]})


# Running the app


if __name__ == "__main__":
    app.run(debug=True)
