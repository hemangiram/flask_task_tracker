#!/usr/bin/env python3
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from database import db
from models import User, Task  # import existing models
import secrets



app = Flask(__name__)
CORS(app)



# JWT secret (strong)
app.config["JWT_SECRET_KEY"] = secrets.token_hex(32)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:agc123@localhost/task_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)  # use your database instance from database.py
jwt = JWTManager(app)


# Create tables if not exist
with app.app_context():
    db.create_all()


# ------------------- Routes -------------------

# Register
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return {"error": "Username already exists"}, 400

    hashed_pw = generate_password_hash(password)
    user = User(username=username, password=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return {"message": "User registered successfully"}, 201




# Login
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        token = create_access_token(identity={"id": user.id, "role": user.role})
        return {"token": token}
    return {"error": "Invalid username or password"}, 401




# Get all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([t.serialize() for t in tasks])




# Add task
@app.route("/tasks", methods=["POST"])
@jwt_required()
def add_task():
    user = get_jwt_identity()
    data = request.json
    text = data.get("text")
    category = data.get("category", "General")
    priority = data.get("priority", "Medium")

    if not text:
        return {"error": "Task cannot be empty"}, 400

    task = Task(text=text, category=category, priority=priority, user_id=user["id"])
    db.session.add(task)
    db.session.commit()
    return task.serialize(), 201



# Edit task
@app.route("/tasks/<int:id>/edit", methods=["PUT"])
@jwt_required()
def edit_task(id):
    user = get_jwt_identity()
    task = Task.query.get(id)
    if not task:
        return {"error": "Task not found"}, 404
    if task.user_id != user["id"] and user["role"] != "admin":
        return {"error": "Access denied"}, 403



    data = request.json
    task.text = data.get("text", task.text)
    task.category = data.get("category", task.category)
    task.priority = data.get("priority", task.priority)
    db.session.commit()
    return task.serialize()



# Toggle task done
@app.route("/tasks/<int:id>/toggle", methods=["PUT"])
@jwt_required()
def toggle_task(id):
    user = get_jwt_identity()
    task = Task.query.get(id)

    
    if not task:
        return {"error": "Task not found"}, 404
    if task.user_id != user["id"] and user["role"] != "admin":
        return {"error": "Access denied"}, 403
    task.done = not task.done
    db.session.commit()
    return task.serialize()



# Admin delete all tasks
@app.route("/admin/tasks", methods=["DELETE"])
@jwt_required()
def admin_delete_all():
    user = get_jwt_identity()
    if user["role"] != "admin":
        return {"error": "Access denied"}, 403

    Task.query.delete()
    db.session.commit()
    return {"message": "All tasks deleted"}




if __name__ == "__main__":
    app.run(debug=True, port=5001)
