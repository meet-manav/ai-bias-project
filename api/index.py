from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import hashlib
import os

app = Flask(__name__)
CORS(app)

# Use /tmp for the database because Vercel's filesystem is read-only.
# Note: Data in /tmp is NOT persistent across different requests or sessions.
DB_FILE = '/tmp/users.db'

def init_db():
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

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

@app.route('/api/register', methods=['POST'])
def register():
    init_db()  # Ensure DB exists in /tmp
    data = request.get_json()
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
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    init_db()  # Ensure DB exists in /tmp
    data = request.get_json()
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

# Add a health check route
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=True)
