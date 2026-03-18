import sqlite3
import json
from datetime import datetime

DB_NAME = 'chat_history.db'

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            user_message TEXT NOT NULL,
            agent_response TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def save_conversation(session_id, user_message, agent_response):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO conversations (session_id, user_message, agent_response)
        VALUES (?, ?, ?)
    ''', (session_id, user_message, agent_response))
    
    conn.commit()
    conn.close()

def get_conversation_history(session_id, limit=10):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT user_message, agent_response, timestamp 
        FROM conversations 
        WHERE session_id = ? 
        ORDER BY timestamp DESC 
        LIMIT ?
    ''', (session_id, limit))
    
    results = cursor.fetchall()
    conn.close()
    
    history = []
    for user_msg, agent_resp, timestamp in reversed(results):
        history.append({
            'user': user_msg,
            'agent': agent_resp,
            'timestamp': timestamp
        })
    
    return history