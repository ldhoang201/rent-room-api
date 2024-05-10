from flask import Flask, request, jsonify
from flask_cors import CORS
from g4f.client import Client
from keywords import keywords
import re

app = Flask(__name__)
CORS(app)

client = Client()

def is_related_to_db_struct(message):
    for keyword in keywords:
        if re.search(keyword, message, re.IGNORECASE):
            return True
    return False

@app.route('/chat', methods=['POST'])
def chat():
    with open("./db-struct.txt", "r", encoding="utf-8") as file:
        db_struct_content = file.read()
    
    if request.method == 'POST':
        message = request.json['message']

        if is_related_to_db_struct(message):
            print("case f1")
            messages = [
                {"role": "user", "content": db_struct_content},
                {"role": "user", "content": "chỉ cần trả về truy vấn (chỉ trả về room_id), không cần giải thích"},
                {"role": "user", "content": message}
            ]
        else:
            print("case f3")
            messages = [
                {"role": "user", "content": "Trả lời bằng tiếng việt"},
                {"role": "user", "content": message}
            ]

        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            prompt="Trả lời ngắn gọn trong giới hạn 200 từ"
        )

        if not is_related_to_db_struct(message):
            response_text = " ".join(response.choices[0].message.content.split()[:200])
            return jsonify({'normal_message': response_text})

        return jsonify({'query': response.choices[0].message.content})

if __name__ == '__main__':
    app.run(debug=True)
