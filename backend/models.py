from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()  

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False) 

   

class Ad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    seller = db.relationship('User', backref='ads')
    status = db.Column(db.String(20), default='available') 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)