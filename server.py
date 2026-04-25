import http.server
import socketserver
import sqlite3
import json
import hashlib
import os
import urllib.parse

PORT = 8000
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

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    
    def send_json_response(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_GET(self):
        # Redirect root to index.html
        if self.path == '/':
            self.path = '/index.html'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if self.path == '/api/register':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                self.send_json_response(400, {'error': 'Username and password required'})
                return
                
            pwd_hash = hash_password(password)
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            try:
                c.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", (username, pwd_hash))
                conn.commit()
                self.send_json_response(201, {'message': 'Registration successful'})
            except sqlite3.IntegrityError:
                self.send_json_response(409, {'error': 'Username already exists'})
            finally:
                conn.close()

        elif self.path == '/api/login':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            username = data.get('username')
            password = data.get('password')
            
            if not username or not password:
                self.send_json_response(400, {'error': 'Username and password required'})
                return
                
            pwd_hash = hash_password(password)
            
            conn = sqlite3.connect(DB_FILE)
            c = conn.cursor()
            c.execute("SELECT id FROM users WHERE username = ? AND password_hash = ?", (username, pwd_hash))
            user = c.fetchone()
            conn.close()
            
            if user:
                # In a real app we would generate a JWT or secure session token here.
                # For this prototype, we'll return a simple mock token.
                mock_token = hashlib.md5(f"{username}_secret_token".encode('utf-8')).hexdigest()
                self.send_json_response(200, {
                    'message': 'Login successful',
                    'token': mock_token,
                    'username': username
                })
            else:
                self.send_json_response(401, {'error': 'Invalid username or password'})
        else:
            self.send_error(404, "Endpoint not found")

if __name__ == '__main__':
    init_db()
    # Ensure working directory is the script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        print("Database initialized successfully.")
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
        print("\nServer stopped.")
