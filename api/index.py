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

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Extract features
    income = float(data.get('income', 0))
    loan_amount = float(data.get('loan_amount', 0))
    cibil = float(data.get('cibil', 650))
    mode = data.get('mode', 'urban')
    gender = data.get('gender', 'male')
    
    # --- Simulated Bias-Aware Logic ---
    # 1. Standard Score (potentially biased)
    std_score = (income * 0.4) + (cibil * 0.5) - (loan_amount * 0.1)
    if mode == 'rural': std_score *= 0.85 # Rural penalty in standard model
    if gender == 'female': std_score *= 0.95 # Gender gap in standard model
    
    # 2. Fair Score (Bias Correction)
    fair_score = (income * 0.4) + (cibil * 0.5) - (loan_amount * 0.1)
    # Neutralize mode and gender
    
    threshold = 20000 # Arbitrary threshold
    std_approved = std_score > threshold
    fair_approved = fair_score > threshold
    
    # Final decision is based on the fair model
    approved = fair_approved
    
    # Generate Reasons
    reasons = []
    if cibil > 750: reasons.append({'type': 'positive', 'text': 'Excellent credit history (CIBIL > 750)'})
    elif cibil > 650: reasons.append({'type': 'positive', 'text': 'Stable credit profile'})
    else: reasons.append({'type': 'negative', 'text': 'Low credit score impact'})
    
    if income > loan_amount * 2: reasons.append({'type': 'positive', 'text': 'Strong Debt-to-Income ratio'})
    elif income < loan_amount * 0.5: reasons.append({'type': 'negative', 'text': 'High loan-to-income risk'})
    
    if mode == 'rural' and not std_approved and fair_approved:
        reasons.append({'type': 'positive', 'text': 'FairLoan AI corrected regional bias for Rural applicant'})

    # Feature Impact
    features = [
        {'name': 'Income Level', 'val': min(40, int(income/1000))},
        {'name': 'Credit Score', 'val': min(35, int((cibil-300)/10))},
        {'name': 'Loan Ratio', 'val': -min(20, int(loan_amount/income*10) if income > 0 else 20)},
        {'name': 'Demographic Fair', 'val': 15 if not std_approved and fair_approved else 5}
    ]

    return jsonify({
        'approved': approved,
        'std_approved': std_approved,
        'fair_approved': fair_approved,
        'reasons': reasons,
        'features': features,
        'schemes': [
            {'icon': 'account_balance', 'title': 'Govt Agri-Support', 'desc': 'Low interest for rural development'} if mode == 'rural' else 
            {'icon': 'business', 'title': 'MSME Startup Fund', 'desc': 'Collateral-free business loans'},
            {'icon': 'woman', 'title': 'Mahila Shakti Scheme', 'desc': '0.5% interest rebate for women'} if gender == 'female' else
            {'icon': 'trending_up', 'title': 'Flexi-EMI Plan', 'desc': 'Step-up payments for young professionals'}
        ],
        'advisor': [
            "Maintain a CIBIL score above 750 for best rates." if cibil < 750 else "Your credit score is in the top tier.",
            "Consider a longer tenure to reduce monthly EMI." if income < loan_amount * 0.8 else "You have healthy repayment capacity.",
            "FairLoan AI ensured your application was processed without regional bias."
        ]
    }), 200

@app.route('/api/bias', methods=['GET'])
def get_bias_stats():
    # Simulated bias statistics for the dashboard
    return jsonify({
        'total_predictions': 1240,
        'gender': {
            'male': 82.5,
            'female': 74.2,
            'bias_pct': 8.3,
            'bias_detected': True
        },
        'mode': {
            'urban': 88.0,
            'rural': 62.5,
            'bias_pct': 25.5,
            'bias_detected': True
        }
    }), 200

# For local testing
if __name__ == '__main__':
    app.run(debug=True)
