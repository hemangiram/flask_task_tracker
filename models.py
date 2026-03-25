from database import db



print("models loaded successfully")
# ================= USER MODEL =================
class User(db.Model):
    __tablename__ = "users"   # ✅ table name

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False) 
    password = db.Column(db.String(200), nullable=False)            
    role = db.Column(db.String(20), default="user")

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "role": self.role
        }


# ================= TASK MODEL =================

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    done = db.Column(db.Boolean, default=False)
    category = db.Column(db.String(50), default="General")
    priority = db.Column(db.String(20), default="Medium")

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "done": self.done,
            "category": self.category,
            "priority": self.priority
        }