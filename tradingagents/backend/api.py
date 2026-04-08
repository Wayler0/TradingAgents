from flask import Flask, request, jsonify

app = Flask(__name__)

# 🔐 LOGIN
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "1234":
        return jsonify({"message": "Login successful"})
    
    return jsonify({"error": "Invalid credentials"}), 401


# 🤖 RUN AGENT
@app.route('/run-agent', methods=['POST'])
def run_agent():
    data = request.json
    strategy = data.get("strategy", "default")

    return jsonify({
        "message": "Agent started",
        "strategy": strategy
    })


# 💼 PORTFOLIO
@app.route('/portfolio', methods=['GET'])
def portfolio():
    return jsonify({
        "balance": 10000,
        "assets": [
            {"name": "BTC", "amount": 0.5},
            {"name": "ETH", "amount": 2}
        ]
    })


if __name__ == '__main__':
    app.run(debug=True)