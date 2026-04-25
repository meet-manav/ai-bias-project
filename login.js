// Check if already logged in
if (sessionStorage.getItem('fairloan_token')) {
    window.location.href = 'index.html';
}

function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const msgBox = document.getElementById('auth-message');

    msgBox.classList.add('hidden'); // Clear messages

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
    }
}

function showMessage(msg, isError = false) {
    const msgBox = document.getElementById('auth-message');
    msgBox.textContent = msg;
    msgBox.className = `auth-message ${isError ? 'error' : 'success'}`;
    msgBox.classList.remove('hidden');
}

// Handle Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-login');
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    try {
        btn.disabled = true;
        btn.textContent = 'Signing in...';

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            sessionStorage.setItem('fairloan_token', data.token);
            sessionStorage.setItem('fairloan_user', data.username);
            window.location.href = 'index.html';
        } else {
            showMessage(data.error || 'Login failed', true);
        }
    } catch (err) {
        showMessage('Server error. Is the Python server running?', true);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Sign In';
    }
});

// Handle Register
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btn-register');
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;

    if (password !== confirm) {
        showMessage('Passwords do not match', true);
        return;
    }

    try {
        btn.disabled = true;
        btn.textContent = 'Creating account...';

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            showMessage('Account created successfully! You can now log in.');
            document.getElementById('register-form').reset();
            setTimeout(() => switchTab('login'), 2000);
        } else {
            showMessage(data.error || 'Registration failed', true);
        }
    } catch (err) {
        showMessage('Server error. Is the Python server running?', true);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Create Account';
    }
});
