import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import json
import os

app = Flask(__name__)
CORS(app)

# Set your OpenAI API key in the .env
openaiClient = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# available_models = ['gpt-3.5-turbo',
#                     'gpt-3.5-turbo-1106',
#                     'gpt-4',
#                     'gpt-4-1106-preview']
# gpt_model = available_models[1]

def prompt_gpt(model, prompt, context, evaluation):

    completion = openaiClient.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Previous Context:\n" + context + "\n\nPrompt: " + prompt,
            }
        ],
        model=model
    )

    response = completion.choices[0].message.content
    print(response)

    # response = response.replace("\n", "<br />")
    print(response)

    return response

@app.route('/api/submit', methods=['POST'])
def submit_data():
    try:
        data = request.get_json()
        model = data.get('model', '')
        prompt = data.get('prompt', '')
        context = data.get('context', '')

        gen_response = prompt_gpt(model, prompt, context, False)
        
        return jsonify(gen_response)

    except Exception as e:
        print(e)

if __name__ == '__main__':
    app.run(debug=True)