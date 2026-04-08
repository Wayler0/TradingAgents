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

# ...existing registration code...

@users_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    users = load_users()
    user = users.get(username)
    if not user:
        return jsonify({'error': 'Invalid username or password'}), 401
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'error': 'Invalid username or password'}), 401
    return jsonify({'status': 'success', 'username': username, 'email': user.get('email')})
