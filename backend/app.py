from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db  # Import your database instance
from auth import auth_bp  # Import your authentication blueprint

app = Flask(__name__)

# ✅ Configure Database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///your_database.db"  # Ensure this matches your database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ✅ Configure JWT
app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Change to a secure secret key
jwt = JWTManager(app)

# ✅ Initialize Extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)  # Allows frontend requests

# ✅ Register Blueprints
app.register_blueprint(auth_bp)  # Ensure this imports correctly

# ✅ Ensure Tables Exist
with app.app_context():
    db.create_all()  # Ensures all tables exist on startup

if __name__ == "__main__":
    app.run(debug=True)
