from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)  # Ensure it's "username"
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)

    # Relationship to Ads and Messages
    ads = db.relationship("Ad", back_populates="seller", lazy=True)
    messages = db.relationship("Message", back_populates="user", lazy=True)

class Ad(db.Model):
    __tablename__ = "ad"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    status = db.Column(db.String(20), default="available") 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to User and Messages
    seller = db.relationship("User", back_populates="ads")
    messages = db.relationship("Message", back_populates="ad", lazy=True)

class Message(db.Model):
    __tablename__ = "message"

    message_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ad_id = db.Column(db.Integer, db.ForeignKey("ad.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)  # Added a timestamp for tracking messages

    # Relationships
    ad = db.relationship("Ad", back_populates="messages")
    user = db.relationship("User", back_populates="messages")

    def __repr__(self):
        return f"<Message {self.message_id} - Ad {self.ad_id} - User {self.user_id}>"
