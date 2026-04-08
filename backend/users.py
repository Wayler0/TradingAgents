import os
import json
import bcrypt
from flask import Blueprint, request, jsonify

users_bp = Blueprint('users', __name__)
USERS_FILE = os.path.join(os.path.dirname(__file__), 'users.json')

def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    with open(USERS_FILE, 'r') as f:
        return json.load(f)

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f)

@users_bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    if not username or not password or not email:
        return jsonify({'error': 'Username, password, and email required'}), 400
    users = load_users()
    # Check for duplicate username
    if username in users:
        return jsonify({'error': 'Username already exists'}), 409
    # Check for duplicate email
    for user in users.values():
        if user.get('email') == email:
            return jsonify({'error': 'Email already registered'}), 409
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    users[username] = {'password': hashed, 'email': email}
    save_users(users)
    return jsonify({'status': 'registered'})
