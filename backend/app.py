from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from marshmallow import Schema, fields

app = Flask(__name__)

app.config['SECRET_KEY'] = 'your_secret_key'  # Replace with a strong secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://local_ad_user:SxB2KaNl1AKK5NKFqQrr5TMfwTSJ8f0e@dpg-cuejjv3tq21c73ehotg0-a.oregon-postgres.render.com/local_ad'  # Or your database URI
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Replace with a strong JWT secret key

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Marshmallow Schemas (for serialization)

class UserSchema(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True)
    email = fields.Email(required=True)

class AdSchema(Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String(required=True)
    description = fields.String(required=True)
    price = fields.Float(required=True)
    seller = fields.Nested(UserSchema, only=('name',))  # Include seller's name
    status = fields.String()
    created_at = fields.DateTime()

user_schema = UserSchema()
users_schema = UserSchema(many=True)
ad_schema = AdSchema()
ads_schema = AdSchema(many=True)

# Database Models

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    ads = db.relationship('Ad', backref='seller')  # Relationship with ads

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.name}>'

class Ad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    seller_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), default='available')  # 'available', 'sold'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Ad {self.title}>'

# Routes

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 400

    new_user = User(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.verify_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token}), 200

    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/ads', methods=['GET'])
def get_ads():
    ads = Ad.query.all()
    return jsonify(ads_schema.dump(ads)), 200

@app.route('/ads', methods=['POST'])
@jwt_required()
def create_ad():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    price = data.get('price')

    if not title or not description or not price:
        return jsonify({'error': 'Missing required fields'}), 400

    user_id = get_jwt_identity()
    user = User.query.get_or_404(user_id)  # Get user or return 404

    new_ad = Ad(title=title, description=description, price=price, seller=user)
    db.session.add(new_ad)
    db.session.commit()

    return ad_schema.jsonify(new_ad), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True)