import os
from flask import send_from_directory

def get_reports_list(reports_dir):
    """Return a list of available report files in the reports directory."""
    if not os.path.exists(reports_dir):
        return []
    files = []
    for root, _, filenames in os.walk(reports_dir):
        for filename in filenames:
            if filename.endswith('.md'):
                rel_dir = os.path.relpath(root, reports_dir)
                rel_file = os.path.join(rel_dir, filename) if rel_dir != '.' else filename
                files.append(rel_file)
    return files

def get_report_file(reports_dir, rel_path):
    """Return the absolute path and directory for a report file."""
    abs_path = os.path.abspath(os.path.join(reports_dir, rel_path))
    if not abs_path.startswith(os.path.abspath(reports_dir)):
        raise ValueError("Invalid report path")
    dir_name = os.path.dirname(abs_path)
    file_name = os.path.basename(abs_path)
    return dir_name, file_name
