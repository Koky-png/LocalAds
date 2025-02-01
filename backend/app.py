from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db
from flask_cors import CORS
app = Flask(__name__)

CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"  
migrate = Migrate(app, db)
db.init_app(app)

from views import *
# Register blueprints
app.register_blueprint(user_bp)
app.register_blueprint(ad_bp)
app.register_blueprint(message_bp)
