from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import os
import re

app = Flask(__name__)

genai.configure(api_key="AIzaSyDSlwVOlLKD_CjrGzaVn7xo7YkyTzRG14o")

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro-latest",
  generation_config=generation_config,
  safety_settings=safety_settings
)

@app.route('/chat', methods=['POST'])
def chat():
    with open('db-struct.txt', 'r') as f:
        db_struct = f.read()
    
    user_input = request.json.get('message')
    user_input += db_struct
    user_input += 'If the question is not related to the query so answer in the shortest way'
    # user_input += 'if the question relate to have to query :just return the query only no need to explain and return room_id(if related to room)'
    
    convo = model.start_chat(history=[])
    convo.send_message(user_input)
    last_message = convo.last.text

    last_message = last_message.replace('##', '').replace('\n', ' ').replace('  ', ' ').replace('```','')

    if "SELECT" in last_message:
        last_message = re.sub("#|\n|```|\*|\*\*", "", last_message)
        last_message = re.sub("  ", " ", last_message)
        response = last_message
        return jsonify({"query": response})
    else:
        last_message = re.sub("#|\n|```|\*|\*\*", "", last_message)
        last_message = re.sub("  ", " ", last_message)
        response = last_message[:200]
        return jsonify({"normal_message": response})



if __name__ == '__main__':
    CORS(app)
    app.run(debug=True)