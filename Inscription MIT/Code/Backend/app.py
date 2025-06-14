from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db
from routes.etudiant_routes import etudiant_bp
from routes.admin_routes import admin_bp
from dotenv import load_dotenv
load_dotenv()


def create_app():
    # db.drop_all()
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Register blueprints
    app.register_blueprint(etudiant_bp, url_prefix='/api/etudiant')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    @app.route('/')
    def home():
        return jsonify({
            'message': 'API d\'inscription universitaire',
            'status': 'active'
        })
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

