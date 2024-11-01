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
from google.generativeai.types import GenerationConfig
from dotenv import load_dotenv
import anthropic
import hashlib
import os
from decorators.decorators import token_required
from bson import ObjectId


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


# Printing generation function
def print_info(model, prompt, chat_len):
    print(
        f"\n| Model: {model}\n| Prompt: {prompt}\n| Prev Chat Count: {str(chat_len)}\n"
    )


# Checking for special keys
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


# Utility function to convert ObjectId fields
def convert_object_ids(obj):
    if isinstance(obj, dict):
        return {k: str(v) if isinstance(v, ObjectId) else convert_object_ids(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_object_ids(i) for i in obj]
    else:
        return obj


# Updating API keys
def update_api_keys(user_id, keys):
    user_collection.update_one({"_id": user_id}, {"$set": {"api_keys": keys}})


#Add to conversation in database
def add_to_conversation(chat_id, role, model, content):
    message = {
        'role': role,
        'model': model,
        'content': content,
        'created_at': datetime.datetime.now(datetime.UTC)
    }
    chat_collection.update_one(
        {'_id': ObjectId(chat_id)},
        {'$push': {'chat': message}}
    )

def generate_title(current_user, model, prompt):
    title_context = "Generate an extremely brief title for this conversation, encapsulating the main theme of the conversation. Examples: 'Python Basics', 'Quantum Mechanics', 'Penguin Types', 'Square root of 4'.\n\n"
    title_context += "Beginning prompt: " + prompt
    title_context += "\n\nTitle: "
    
    title = prompt_llm(current_user, model, title_context, [], 20, title=True)

    print("\nGenerated title: " + title + "\n\n")
    return title.replace("'", "").replace('"', '').strip()


### Main LLM prompting


def prompt_llm(current_user=None, model="gpt-3.5-turbo", prompt="", chat=[], max_tokens=1024, title=False):
    if not current_user:
        return {'role': 'system', 'model': model, 'content': 'User not found.', 'created_at': datetime.datetime.now(datetime.UTC)}
    
    keys = check_special(current_user.get("api_keys"))

    super_context = "You are a chatbot. I will provide the previous chat messages below from our conversation. **IMPORTANT: DO NOT ADD PREFIXES TO YOUR RESPONSE (I.E. 'System' or 'Response'). ONLY RESPOND WITH YOUR RESPONSE AND NO PREFIX.**\n\n"
    previous_context = "Previous chat messages:\n\n"

    for message in chat:
        previous_context += f"{message['role'].upper()}: {message['content']}\n"
    
    total_context = super_context + previous_context + "\n\nNew Prompt: " + prompt

    if not title:
        print_info(model, prompt, len(chat))

    try:
        # Prompting the LLM

        # OpenAI
        if model in ["gpt-3.5-turbo", "gpt-4", "gpt-4-32k", "gpt-4-0125-preview", "gpt-4o", "o1-mini"]:
            openaiClient = OpenAI(api_key=keys["openai-key"])

            completion = openaiClient.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": total_context,
                    }
                ],
                model=model,
                max_tokens=max_tokens,
            )
            response = completion.choices[0].message.content

        # Google
        elif model in ["google-gemini"]:
            genai.configure(api_key=keys["gemini-key"])

            gemini = genai.GenerativeModel("gemini-pro", generation_config=GenerationConfig(max_tokens=max_tokens))
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
                max_tokens=max_tokens,
                messages=[
                    {
                        "role": "user",
                        "content": total_context,
                    }
                ],
            )
            response = completion.content[0].text

        if not title:
            print(f"\nGenerated response:\n{response}\n")
        return response

    except Exception as e:
        return "An error has occurred. Please double-check your API keys and try again."


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
        keys = current_user.get("api_keys")
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
        data = request.get_json()
        model, prompt = data.get('model'), data.get('prompt')

        generation = prompt_llm(current_user, model, prompt, [])
        
        new_chat = {
            "user_id": current_user["_id"],
            "created_at": datetime.datetime.now(datetime.UTC),
            "chat": [],
        }
        chat_id = chat_collection.insert_one(new_chat).inserted_id

        add_to_conversation(chat_id, 'user', model, prompt)
        add_to_conversation(chat_id, 'system', model, generation)

        if generation == "An error has occurred. Please double-check your API keys and try again.":
            chat_title = "System Error"
        else:
            chat_title = generate_title(current_user, model, prompt)

        chat_collection.update_one(
            {'_id': ObjectId(chat_id)},
            {'$set': {'title': chat_title}}
        )

        return jsonify({"chat_id": str(chat_id)}), 201
    except Exception as e:
        return jsonify({"error": "Failed to create chat."}), 400


# Get chats route
@app.route("/chats", methods=["GET"])
@token_required()
def get_chats(current_user):
    chats = list(chat_collection.find({"user_id": current_user["_id"]},
                 {"_id": 1, "created_at": 1, "title": 1}))
    if not chats:
        return jsonify({"message": "No chats found."}), 200
    chats = [convert_object_ids(chat) for chat in chats]
    return jsonify({"chats": chats})


# Delete chat route
@app.route("/chat/<chat_id>", methods=["DELETE"])
@token_required()
def delete_chat(current_user, chat_id):
    try:
        chat = chat_collection.find_one({"_id": ObjectId(chat_id)})
    except Exception as e:
        return jsonify({"error": "Chat not found."}), 404
    if chat:
        if chat["user_id"] != current_user["_id"]:
            return jsonify({"error": "Unauthorized access."}), 401
        chat_collection.delete_one({"_id": ObjectId(chat_id)})
        return jsonify({"message": "Chat deleted successfully."}), 200
    return jsonify({"error": "Chat not found."}), 404


# Delete chats route
@app.route("/chats", methods=["DELETE"])
@token_required()
def delete_chats(current_user):
    chat_collection.delete_many({"user_id": current_user["_id"]})
    return jsonify({"message": "Chats deleted successfully."}), 200


# Get specific chat route
@app.route("/chat/<chat_id>", methods=["GET"])
@token_required()
def get_chat(current_user, chat_id):
    try:
        chat = chat_collection.find_one({"_id": ObjectId(chat_id)})
    except Exception as e:
        return jsonify({"error": "Chat not found."}), 404
    if chat:
        if chat["user_id"] != current_user["_id"]:
            return jsonify({"error": "Unauthorized access."}), 401
        chat = convert_object_ids(chat)
        return jsonify(chat)
    return jsonify({"error": "Chat not found."}), 404


# Add chat message route
@app.route('/chat/<chat_id>/message', methods=['POST'])
@token_required()
def add_message(current_user, chat_id):
    try:
        chat = chat_collection.find_one({"_id": ObjectId(chat_id)})
    except Exception as e:
        return jsonify({"error": "Chat not found."}), 404

    if chat:
        if chat['user_id'] != current_user['_id']:
            return jsonify({'error': 'Unauthorized access.'}), 401
        
        data = request.get_json()
        model, prompt = data.get('model'), data.get('prompt')
        
        add_to_conversation(chat_id, 'user', model, prompt)

        generation = prompt_llm(current_user, model, prompt, chat['chat'])

        add_to_conversation(chat_id, 'system', model, generation)

        try:
            new_chat = chat_collection.find_one({"_id": ObjectId(chat_id)})
        except Exception as e:
            return jsonify({"error": "Chat not found."}), 404

        return jsonify(new_chat['chat'])
    
    return jsonify({'error': 'Chat not found.'}), 404


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
