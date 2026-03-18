from flask import Flask, request, jsonify, session
from flask_cors import CORS
from crew.crew_setup import run_crew
from database.db import init_db, save_conversation, get_conversation_history
import uuid
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev-secret-key')
CORS(app, supports_credentials=True)

# Initialize database
init_db()

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        session_id = data.get('session_id', str(uuid.uuid4()))
        
        # Get conversation history
        history = get_conversation_history(session_id, limit=5)
        
        # Run the multi-agent crew
        result = run_crew(user_message, history)
        
        # Save to database
        save_conversation(session_id, user_message, result)
        
        return jsonify({
            'response': result,
            'session_id': session_id,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/history/<session_id>', methods=['GET'])
def get_history(session_id):
    try:
        history = get_conversation_history(session_id)
        return jsonify({
            'history': history,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)