from flask import jsonify, request, Blueprint
from models import User, db
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint('user_bp', __name__)

# Register User
@user_bp.route('/api/users/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return jsonify({'error': 'Missing required fields'}), 400

        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters long'}), 400

        check_username = User.query.filter_by(username=username).first()
        check_email = User.query.filter_by(email=email).first()

        if check_username or check_email:
            return jsonify({'error': 'User already exists'}), 400

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        new_user = User(username=username, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.id)
        return jsonify({'msg': 'User created successfully', 'token': access_token}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
