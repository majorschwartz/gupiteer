import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import json
import os

app = Flask(__name__)
CORS(app)

openaiClient = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
    return response

@app.route('/api/submit', methods=['POST'])
def submit_data():
    try:
        data = request.get_json()
        model = data.get('model', 'gpt-3.5-turbo')
        evaluate = data.get('evaluate', False)
        prompt = data.get('prompt', '')
        respList = data.get('respList', [])

        print(respList)
        gen_response = prompt_gpt(model, False, prompt, respList)
        return jsonify(gen_response)
    except Exception as e:
        print(e)
        return e

if __name__ == '__main__':
    app.run(debug=True)