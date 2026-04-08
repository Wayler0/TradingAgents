
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sys
import threading
import uuid
import time

sys.path.append('..')  # Ensure parent dir is in path for imports
from tradingagents.api.analysis_service import run_analysis_api
from backend.report_utils import get_reports_list, get_report_file
from backend.users import users_bp
from backend.login import users_bp as login_bp

# In-memory task store (for demo; use Redis or DB for production)
tasks = {}

app = Flask(__name__)
CORS(app)
app.register_blueprint(users_bp)
app.register_blueprint(login_bp)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    task_id = str(uuid.uuid4())
    tasks[task_id] = {"status": "pending", "result": None}

    def run_task():
        try:
            result = run_analysis_api(data)
            tasks[task_id]["status"] = "completed"
            tasks[task_id]["result"] = result
        except Exception as e:
            tasks[task_id]["status"] = "error"
            tasks[task_id]["result"] = str(e)

    thread = threading.Thread(target=run_task)
    thread.start()
    return jsonify({"status": "started", "task_id": task_id})

@app.route('/api/progress/<task_id>', methods=['GET'])
def progress(task_id):
    task = tasks.get(task_id)
    if not task:
        return jsonify({"status": "not_found", "task_id": task_id}), 404
    return jsonify({
        "status": task["status"],
        "task_id": task_id,
        "result": task["result"] if task["status"] == "completed" else None
    })


# Directory where reports are stored (customize as needed)
REPORTS_DIR = '../results'

@app.route('/api/reports', methods=['GET'])
def reports():
    files = get_reports_list(REPORTS_DIR)
    return jsonify({"reports": files})

@app.route('/api/reports/<path:rel_path>', methods=['GET'])
def download_report(rel_path):
    try:
        dir_name, file_name = get_report_file(REPORTS_DIR, rel_path)
        return send_from_directory(dir_name, file_name, as_attachment=True)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
