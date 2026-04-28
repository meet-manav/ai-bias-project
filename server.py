import json
import sqlite3
import hashlib
import os
import math
import random
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
import threading

PORT = 8080
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fairloan.db')

# ─────────────────────────────────────────────
# DATABASE INIT
# ─────────────────────────────────────────────
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
    c.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            gender TEXT,
            mode TEXT,
            loan_type TEXT,
            income REAL,
            loan_amount REAL,
            cibil INTEGER,
            emi REAL,
            job_type TEXT,
            existing_loans INTEGER,
            missed_payments INTEGER,
            occupation TEXT,
            land_ownership TEXT,
            savings_habit TEXT,
            payment_behavior TEXT,
            financial_health REAL,
            property_value REAL,
            approved INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def get_conn():
    return sqlite3.connect(DB_FILE)

# ─────────────────────────────────────────────
# PREDICTION ENGINE
# ─────────────────────────────────────────────
def run_prediction(data):
    mode = data.get('mode', 'urban')
    income = float(data.get('income', 0))
    loan_amount = float(data.get('loan_amount', 0))
    cibil = int(data.get('cibil', 750))
    emi = float(data.get('emi', 0))
    job_type = data.get('job_type', 'salaried')
    existing_loans = int(data.get('existing_loans', 0))
    missed_payments = int(data.get('missed_payments', 0))
    occupation = data.get('occupation', 'farmer')
    land_ownership = data.get('land_ownership', 'no')
    savings_habit = data.get('savings_habit', 'yes')
    payment_behavior = data.get('payment_behavior', 'good')
    financial_health = float(data.get('financial_health', 50))
    property_value = float(data.get('property_value', 0))
    loan_type = data.get('loan_type', 'home')
    gender = data.get('gender', 'male')

    approved = True
    reasons = []
    features = []
    score = 100  # Start with base score

    if mode == 'urban':
        # CIBIL
        if cibil < 600:
            approved = False
            score -= 40
            reasons.append({'text': 'Very low CIBIL Score (< 600)', 'type': 'negative'})
            features.append({'name': 'CIBIL Score', 'val': -80})
        elif cibil < 650:
            approved = False
            score -= 25
            reasons.append({'text': 'Low CIBIL Score (< 650)', 'type': 'negative'})
            features.append({'name': 'CIBIL Score', 'val': -50})
        elif cibil >= 750:
            score += 10
            reasons.append({'text': 'Excellent CIBIL Score (≥ 750)', 'type': 'positive'})
            features.append({'name': 'CIBIL Score', 'val': 80})
        else:
            reasons.append({'text': 'Acceptable CIBIL Score', 'type': 'positive'})
            features.append({'name': 'CIBIL Score', 'val': 50})

        # EMI Ratio
        emi_ratio = (emi / income) if income > 0 else 1
        if emi_ratio > 0.6:
            approved = False
            score -= 30
            reasons.append({'text': f'High EMI-to-Income ratio ({round(emi_ratio * 100)}%)', 'type': 'negative'})
            features.append({'name': 'EMI Burden', 'val': -70})
        elif emi_ratio > 0.4:
            score -= 10
            reasons.append({'text': f'Moderate EMI burden ({round(emi_ratio * 100)}%)', 'type': 'negative'})
            features.append({'name': 'EMI Burden', 'val': -30})
        else:
            features.append({'name': 'EMI Burden', 'val': 50})

        # Income adequacy
        if income < 15000:
            approved = False
            score -= 20
            reasons.append({'text': 'Income below minimum threshold (₹15,000)', 'type': 'negative'})
            features.append({'name': 'Income', 'val': -60})
        elif income >= 50000:
            score += 10
            features.append({'name': 'Income', 'val': 70})
        else:
            features.append({'name': 'Income', 'val': 40})

        # Missed Payments
        if missed_payments >= 3:
            approved = False
            score -= 30
            reasons.append({'text': f'{missed_payments} missed payments on record', 'type': 'negative'})
            features.append({'name': 'Payment History', 'val': -65})
        elif missed_payments == 0:
            score += 5
            reasons.append({'text': 'No missed payments — excellent history', 'type': 'positive'})
            features.append({'name': 'Payment History', 'val': 60})
        else:
            features.append({'name': 'Payment History', 'val': -20})

        # Existing Loans
        if existing_loans >= 3:
            score -= 15
            reasons.append({'text': f'{existing_loans} existing active loans', 'type': 'negative'})
            features.append({'name': 'Existing Loans', 'val': -40})
        elif existing_loans == 0:
            features.append({'name': 'Existing Loans', 'val': 30})

        # Job Type
        if job_type == 'salaried':
            score += 5
            features.append({'name': 'Job Stability', 'val': 55})
        else:
            features.append({'name': 'Job Stability', 'val': 30})

        # Financial Health
        if financial_health < 30:
            approved = False
            score -= 20
            reasons.append({'text': 'Poor financial health score', 'type': 'negative'})
            features.append({'name': 'Financial Health', 'val': -50})
        else:
            features.append({'name': 'Financial Health', 'val': min(int(financial_health), 80)})

    else:  # Rural Mode
        if payment_behavior == 'bad':
            approved = False
            score -= 35
            reasons.append({'text': 'History of delayed/bad payments', 'type': 'negative'})
            features.append({'name': 'Payment History', 'val': -70})
        else:
            score += 10
            reasons.append({'text': 'Good past payment behavior', 'type': 'positive'})
            features.append({'name': 'Payment History', 'val': 80})

        if savings_habit == 'yes':
            score += 10
            reasons.append({'text': 'Consistent savings pattern', 'type': 'positive'})
            features.append({'name': 'Savings Habit', 'val': 60})
        else:
            if financial_health < 30:
                approved = False
                score -= 20
                reasons.append({'text': 'No savings habit & low financial health', 'type': 'negative'})
            features.append({'name': 'Savings Habit', 'val': -30 if financial_health < 30 else 10})

        if land_ownership == 'yes':
            score += 15
            reasons.append({'text': 'Land ownership acts as collateral', 'type': 'positive'})
            features.append({'name': 'Collateral (Land)', 'val': 55})

        income_ok = income >= 8000
        if not income_ok:
            approved = False
            score -= 20
            reasons.append({'text': 'Income below rural minimum threshold', 'type': 'negative'})
            features.append({'name': 'Income', 'val': -50})
        else:
            features.append({'name': 'Income', 'val': 50})

        if financial_health >= 40:
            features.append({'name': 'Financial Health', 'val': min(int(financial_health), 75)})
        else:
            features.append({'name': 'Financial Health', 'val': -30})

    # Property value (for home/LAP)
    if loan_type in ['home', 'lap'] and property_value > 0:
        ltv = loan_amount / property_value if property_value > 0 else 1
        if ltv > 0.85:
            score -= 15
            reasons.append({'text': f'Loan-to-Value ratio too high ({round(ltv*100)}%)', 'type': 'negative'})
            features.append({'name': 'LTV Ratio', 'val': -40})
        else:
            features.append({'name': 'LTV Ratio', 'val': 45})

    # Final score clamp
    score = max(0, min(100, score))

    # Fair model: rural/female slight boost
    fair_adjustment = 0
    fair_reasons = []
    if mode == 'rural':
        fair_adjustment = 8
        fair_reasons.append('Rural applicant bias correction (+8 pts)')
    if gender == 'female':
        fair_adjustment += 5
        fair_reasons.append('Gender equity correction (+5 pts)')

    fair_score = min(100, score + fair_adjustment)
    fair_approved = fair_score >= 55 or (approved and fair_score >= 45)
    std_approved = approved and score >= 50

    # Recommendations
    schemes = []
    if mode == 'rural':
        if occupation == 'farmer':
            schemes.append({'title': 'Kisan Credit Card (KCC)', 'desc': 'Subsidized interest at 4% for agricultural credit.', 'icon': 'agriculture'})
        if loan_type == 'home':
            schemes.append({'title': 'PM Awas Yojana (Gramin)', 'desc': 'Financial assistance for rural housing construction.', 'icon': 'home'})
        schemes.append({'title': 'Mudra Loan (Shishu)', 'desc': 'Up to ₹50,000 for micro-enterprises at low rates.', 'icon': 'storefront'})
    else:
        if loan_type == 'home':
            schemes.append({'title': 'PM Awas Yojana (Urban)', 'desc': 'Credit linked subsidy for affordable urban housing.', 'icon': 'apartment'})
        schemes.append({'title': 'Mudra Loan', 'desc': 'Up to ₹10 Lakhs for micro/small enterprises.', 'icon': 'storefront'})
        if cibil < 700:
            schemes.append({'title': 'Credit Builder Loan', 'desc': 'Small secured loan to build your credit profile.', 'icon': 'trending_up'})

    # Advisor tips
    advisor = []
    if not approved:
        if mode == 'urban':
            if cibil < 650:
                advisor.append('Consistently pay all bills and EMIs on time to improve your CIBIL score.')
                advisor.append('Keep credit card utilization below 30% of your credit limit.')
            if emi / income > 0.4 if income > 0 else False:
                advisor.append('Close or prepay existing loans to reduce your EMI burden before re-applying.')
            if missed_payments > 0:
                advisor.append('Contact your lender to dispute or clear any missed payment records.')
            advisor.append('Build an emergency fund of at least 3 months of expenses.')
        else:
            advisor.append('Open a recurring deposit account to establish a savings track record.')
            advisor.append('Route all income through your bank account to improve your financial profile.')
            advisor.append('Consider a joint loan application with a co-applicant for better approval odds.')
    else:
        advisor.append('Opt for a shorter loan tenure to save significantly on total interest paid.')
        advisor.append('Set up auto-debit for EMI payments to protect your credit score.')
        advisor.append('Keep your EMI under 40% of monthly income for financial stability.')

    return {
        'approved': fair_approved,
        'std_approved': std_approved,
        'fair_approved': fair_approved,
        'score': fair_score,
        'std_score': score,
        'reasons': reasons[:5],
        'features': features[:6],
        'schemes': schemes,
        'advisor': advisor,
        'fair_adjustment': fair_adjustment,
        'fair_reasons': fair_reasons
    }

# ─────────────────────────────────────────────
# BIAS ENGINE
# ─────────────────────────────────────────────
def compute_bias():
    conn = get_conn()
    c = conn.cursor()

    def approval_rate(filters):
        where = ' AND '.join(f"{k}='{v}'" for k, v in filters.items())
        c.execute(f"SELECT COUNT(*), SUM(approved) FROM predictions WHERE {where}")
        row = c.fetchone()
        total = row[0] or 0
        approved = row[1] or 0
        return round((approved / total * 100), 1) if total > 0 else None

    male_rate = approval_rate({'gender': 'male'})
    female_rate = approval_rate({'gender': 'female'})
    urban_rate = approval_rate({'mode': 'urban'})
    rural_rate = approval_rate({'mode': 'rural'})

    c.execute("SELECT COUNT(*) FROM predictions")
    total = c.fetchone()[0]
    conn.close()

    gender_bias = abs((male_rate or 0) - (female_rate or 0))
    urban_rural_bias = abs((urban_rate or 0) - (rural_rate or 0))

    return {
        'total_predictions': total,
        'gender': {
            'male': male_rate,
            'female': female_rate,
            'bias_pct': round(gender_bias, 1),
            'bias_detected': gender_bias > 10
        },
        'mode': {
            'urban': urban_rate,
            'rural': rural_rate,
            'bias_pct': round(urban_rural_bias, 1),
            'bias_detected': urban_rural_bias > 15
        }
    }

# ─────────────────────────────────────────────
# HTTP HANDLER
# ─────────────────────────────────────────────
class FairLoanHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass  # Suppress noisy logs

    def send_json(self, status, data):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', len(body))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == '/':
            self.path = '/index.html'
            return self._serve_static()
        elif path == '/api/bias':
            self.send_json(200, compute_bias())
        elif path == '/api/health':
            self.send_json(200, {'status': 'ok', 'version': '2.0'})
        else:
            return self._serve_static()

    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        body = json.loads(self.rfile.read(length).decode('utf-8')) if length else {}

        if self.path == '/api/register':
            username = body.get('username', '').strip()
            password = body.get('password', '')
            if not username or not password:
                return self.send_json(400, {'error': 'Username and password required'})
            conn = get_conn()
            c = conn.cursor()
            try:
                c.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)",
                          (username, hash_password(password)))
                conn.commit()
                self.send_json(201, {'message': 'Registration successful'})
            except sqlite3.IntegrityError:
                self.send_json(409, {'error': 'Username already exists'})
            finally:
                conn.close()

        elif self.path == '/api/login':
            username = body.get('username', '').strip()
            password = body.get('password', '')
            conn = get_conn()
            c = conn.cursor()
            c.execute("SELECT id FROM users WHERE username=? AND password_hash=?",
                      (username, hash_password(password)))
            user = c.fetchone()
            conn.close()
            if user:
                token = hashlib.md5(f"{username}_fairloan_secret".encode()).hexdigest()
                self.send_json(200, {'message': 'Login successful', 'token': token, 'username': username})
            else:
                self.send_json(401, {'error': 'Invalid username or password'})

        elif self.path == '/api/predict':
            username = body.get('username', 'anonymous')
            result = run_prediction(body)
            # Store prediction
            conn = get_conn()
            c = conn.cursor()
            c.execute('''INSERT INTO predictions
                (username, gender, mode, loan_type, income, loan_amount, cibil, emi,
                 job_type, existing_loans, missed_payments, occupation, land_ownership,
                 savings_habit, payment_behavior, financial_health, property_value, approved)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)''',
                (username, body.get('gender'), body.get('mode'), body.get('loan_type'),
                 body.get('income', 0), body.get('loan_amount', 0), body.get('cibil', 0),
                 body.get('emi', 0), body.get('job_type'), body.get('existing_loans', 0),
                 body.get('missed_payments', 0), body.get('occupation'), body.get('land_ownership'),
                 body.get('savings_habit'), body.get('payment_behavior'),
                 body.get('financial_health', 0), body.get('property_value', 0),
                 1 if result['approved'] else 0))
            conn.commit()
            conn.close()
            self.send_json(200, result)

        else:
            self.send_json(404, {'error': 'Endpoint not found'})

    def _serve_static(self):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = base_dir + self.path.split('?')[0]
        if os.path.isfile(file_path):
            ext = file_path.split('.')[-1]
            mime = {
                'html': 'text/html', 'css': 'text/css', 'js': 'application/javascript',
                'png': 'image/png', 'jpg': 'image/jpeg', 'svg': 'image/svg+xml',
                'ico': 'image/x-icon', 'json': 'application/json'
            }.get(ext, 'application/octet-stream')
            with open(file_path, 'rb') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', mime)
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        else:
            self.send_json(404, {'error': 'File not found'})

# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
if __name__ == '__main__':
    init_db()
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = HTTPServer(('', PORT), FairLoanHandler)
    print(f"FairLoan AI Server running at http://localhost:{PORT}")
    print(f"   Database: {DB_FILE}")
    print("   Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
