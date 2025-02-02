from flask import jsonify, request, Blueprint
from models import User, db
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint('user_bp', __name__)

# Register User
# Add user
@user_bp.route("/users", methods=["POST"])
def add_users():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password_hash = generate_password_hash(data['password_hash'])

    check_username = User.query.filter_by(username=username).first()
    check_email = User.query.filter_by(email=email).first()

    print("Email ",check_email)
    print("Username",check_username)
    if check_username or check_email:
        return jsonify({"error":"Username/email exists"}),406

    else:
        new_user = User(username=username, email=email, password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()
        # try:
        #     msg = Message(
        #         subject="Welcome to Todo App",
        #         sender=app.config["MAIL_DEFAULT_SENDER"],
        #         recipients=[email],
        #         body="This is a test email sent from a Flask Application"

        #     )
        #     mail.send(msg)
        return jsonify({"msg":"User saved successfully!"}), 201
        
        # except Exception as e:
        #     return jsonify({"error": f"Failed to send {e}"}), 406