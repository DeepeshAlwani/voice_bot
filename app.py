from flask import Flask, request, jsonify, send_from_directory
import os
import openai
from flask_cors import CORS

app = Flask(__name__, static_folder='.')
CORS(app)  # Enable CORS for all routes

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        question = data.get("question", "")
        api_key = data.get("api_key", "")
        
        if not api_key:
            return jsonify({"answer": "Error: No API key provided. Please provide your OpenAI API key."}), 400
        
        if not question:
            return jsonify({"answer": "I didn't catch your question. Could you please repeat it?"})
        
        # Use the API key provided in the request
        answer = generate_response(question, api_key)
        return jsonify({"answer": answer})
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({"answer": f"An error occurred: {str(e)}"}), 500

def generate_response(question, api_key):
    try:
        # Set the API key from the request
        openai.api_key = api_key
        
        # Using the chat completions API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a job candidate being interviewed for a position in the AI Agent Team at Home.LLC. Answer as if you are in a job interview, showcasing your skills, experience, and personality."},
                {"role": "user", "content": question}
            ],
            max_tokens=150,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return f"I apologize, but I encountered an error: {str(e)}"

# Serve the index.html file
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Serve static files
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True)