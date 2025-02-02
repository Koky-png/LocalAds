from flask import jsonify, request, Blueprint
from models import User, db
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint('user_bp', __name__)

# Register User
# Add user

@user_bp.route("/users", methods=["POST"])
def add_users():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')  # ✅ Fix password field name

        # ✅ Validate input
        if not username or not email or not password:
            return jsonify({"error": "Username, email, and password are required"}), 400

        # ✅ Hash the password correctly
        password_hash = generate_password_hash(password)

        # ✅ Check if username or email already exists
        check_username = User.query.filter_by(username=username).first()
        check_email = User.query.filter_by(email=email).first()

        print("Checking existing users...")
        print("Email:", check_email)
        print("Username:", check_username)

        if check_username or check_email:
            return jsonify({"error": "Username or email already exists"}), 406

        # ✅ Create new user
        new_user = User(username=username, email=email, password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"msg": "User saved successfully!"}), 201  # ✅ Fix indentation

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"User registration failed: {str(e)}"}), 500