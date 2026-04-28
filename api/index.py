from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
import os

app = Flask(__name__)
CORS(app)

# Vercel-friendly DB path
DB_FILE = '/tmp/users.db'

def init_db():
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL
            )
        ''')
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"DB Init Error: {e}")
        return False

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Root API route for diagnostics
@app.route('/api', methods=['GET'])
def api_root():
    return jsonify({
        'status': 'API is running',
        'database_initialized': init_db(),
        'endpoints': ['/api/login', '/api/register', '/api/health']
    }), 200

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'db': init_db()}), 200

@app.route('/api/register', methods=['POST'])
def register():
    init_db()
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
        
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    pwd_hash = hash_password(password)

    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    try:
        c.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", (username, pwd_hash))
        conn.commit()
        return jsonify({'message': 'Registration successful'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username already exists'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    init_db()
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    pwd_hash = hash_password(password)

    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT id FROM users WHERE username = ? AND password_hash = ?", (username, pwd_hash))
    user = c.fetchone()
    conn.close()

    if user:
        mock_token = hashlib.md5(f"{username}_secret_token".encode('utf-8')).hexdigest()
        return jsonify({
            'message': 'Login successful',
            'token': mock_token,
            'username': username
        }), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

# For local testing
if __name__ == '__main__':
    app.run(debug=True)
