from flask import Blueprint, request, jsonify
from models import User, db, TokenBlocklist
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import datetime
from datetime import timedelta
from datetime import timezone

auth_bp = Blueprint("auth_bp", __name__)


# Login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password_hash = data["password_hash"]
    
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password_hash, password_hash ) :
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200

    else:
        return jsonify({"error": "Either email/password is incorrect"}), 404
    
    # current user
@auth_bp.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id  = get_jwt_identity()

    user =  User.query.get(current_user_id)
    user_data = {
            'id':user.id,
            'email':user.email,
            'username':user.username
        }

    return jsonify(user_data)

@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    try:
        jti = get_jwt()["jti"]
        now = datetime.now(timezone.utc)

        # Check if token is already blacklisted
        existing_token = TokenBlocklist.query.filter_by(jti=jti).first()
        if existing_token:
            return jsonify({"error": "Token already invalidated"}), 400

        # Blacklist the token
        db.session.add(TokenBlocklist(jti=jti, created_at=now))
        db.session.commit()

        return jsonify({"success": "Logged out successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
