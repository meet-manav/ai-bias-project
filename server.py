from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import hashlib
import os

app = Flask(__name__, static_folder='.')
CORS(app)

DB_FILE = 'users.db'

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

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'FairLoan AI Server is running'}), 200

@app.route('/api/register', methods=['POST'])
def register():
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

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    income = float(data.get('income', 0))
    loan_amount = float(data.get('loan_amount', 0))
    cibil = float(data.get('cibil', 650))
    mode = data.get('mode', 'urban')
    gender = data.get('gender', 'male')
    
    # Logic matching api/index.py for parity
    std_score = (income * 0.4) + (cibil * 0.5) - (loan_amount * 0.1)
    if mode == 'rural': std_score *= 0.85
    if gender == 'female': std_score *= 0.95
    
    fair_score = (income * 0.4) + (cibil * 0.5) - (loan_amount * 0.1)
    
    threshold = 20000
    std_approved = std_score > threshold
    fair_approved = fair_score > threshold
    
    return jsonify({
        'approved': fair_approved,
        'std_approved': std_approved,
        'fair_approved': fair_approved,
        'reasons': [
            {'type': 'positive' if cibil > 650 else 'negative', 'text': 'Credit score assessment'},
            {'type': 'positive' if income > loan_amount * 0.8 else 'negative', 'text': 'Income sustainability'}
        ],
        'features': [
            {'name': 'Income Level', 'val': 30},
            {'name': 'Credit Score', 'val': 45},
            {'name': 'Fairness Adjustment', 'val': 15 if not std_approved and fair_approved else 5}
        ],
        'schemes': [
            {'icon': 'account_balance', 'title': 'National Grant', 'desc': 'Low-interest development loan'},
            {'icon': 'trending_up', 'title': 'Growth Plan', 'desc': 'Flexible repayment options'}
        ],
        'advisor': ["Maintain high savings habit.", "FairLoan AI protected your application from demographic bias."]
    }), 200

@app.route('/api/bias', methods=['GET'])
def get_bias():
    return jsonify({
        'total_predictions': 1240,
        'gender': {'male': 82.5, 'female': 74.2, 'bias_pct': 8.3, 'bias_detected': True},
        'mode': {'urban': 88.0, 'rural': 62.5, 'bias_pct': 25.5, 'bias_detected': True}
    }), 200

if __name__ == '__main__':
    init_db()
    PORT = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=PORT)
