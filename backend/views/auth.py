from flask import jsonify, request, Blueprint
from models import db, User, TokenBlocklist
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, create_access_token
from werkzeug.security import check_password_hash
from datetime import datetime, timezone

auth_bp = Blueprint('auth', __name__)

# Login Route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Check if email and password are provided
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Query the database for the user
    user = User.query.filter_by(email=email).first()

    # Check if user exists and password is correct
    if user and check_password_hash(user.password_hash, password):  # Fixed password field
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200

    return jsonify({"error": "Invalid email or password"}), 401


# Get Current User
@auth_bp.route('/current_user', methods=['GET'])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    user_data = {
        'id': user.id,
        'username': user.name,  # Changed from `user.username` (assuming `name` is correct)
        'email': user.email
    }
    return jsonify(user_data), 200


# Logout Route
@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]  # Get JWT ID
    now = datetime.now(timezone.utc)

    # Add token to blocklist
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    
    return jsonify({"success": "Logged out successfully"}), 200
