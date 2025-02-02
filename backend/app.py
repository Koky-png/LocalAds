from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db 
from datetime import timedelta
app = Flask(__name__)

CORS(app)

# ✅ Configure Database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///localads.db"  
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)
migrate = Migrate(app, db)



# jwt
app.config["JWT_SECRET_KEY"] = "jiyucfvbkaudhudkvfbt" 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] =  timedelta(hours=1)

jwt = JWTManager(app)
jwt.init_app(app)



from views import*
app.register_blueprint(auth_bp)  
app.register_blueprint(user_bp) 
app.register_blueprint(message_bp)  
app.register_blueprint(ad_bp)  

with app.app_context():
    db.create_all()  # Ensures all tables exist on startup



