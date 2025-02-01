from flask import Blueprint, request, jsonify
from models import db, Ad, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

ad_bp = Blueprint('ad_bp', __name__)

# Post an Ad
@ad_bp.route('/ads', methods=['POST'])
@jwt_required()
def post_ad():
    try:
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        price = data.get('price')
        image_url = data.get('image_url', '')
        seller_id = get_jwt_identity()

        if not title or not description or price is None:
            return jsonify({'error': 'Missing required fields'}), 400

        new_ad = Ad(
            title=title,
            description=description,
            price=price,
            image_url=image_url,
            seller_id=seller_id,
            created_at=datetime.utcnow()
        )
        db.session.add(new_ad)
        db.session.commit()

        return jsonify({'msg': 'Ad posted successfully', 'ad_id': new_ad.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to post ad', 'details': str(e)}), 500


# Get a single Ad
@ad_bp.route('/ads/<int:ad_id>', methods=['GET'])
def get_ad(ad_id):
    ad = Ad.query.get(ad_id)
    if not ad:
        return jsonify({'error': 'Ad not found'}), 404

    return jsonify({
        'id': ad.id,
        'title': ad.title,
        'description': ad.description,
        'price': ad.price,
        'image_url': ad.image_url,
        'seller_id': ad.seller_id,
        'status': ad.status,
        'created_at': ad.created_at
    }), 200


# Get all Ads
@ad_bp.route('/ads', methods=['GET'])
def get_ads():
    ads = Ad.query.all()
    ad_list = [{
        'id': ad.id,
        'title': ad.title,
        'description': ad.description,
        'price': ad.price,
        'image_url': ad.image_url,
        'seller_id': ad.seller_id,
        'status': ad.status,
        'created_at': ad.created_at
    } for ad in ads]

    return jsonify(ad_list), 200


# Update an Ad
@ad_bp.route('/ads/<int:ad_id>', methods=['PUT'])
@jwt_required()
def update_ad(ad_id):
    try:
        ad = Ad.query.get(ad_id)
        if not ad:
            return jsonify({'error': 'Ad not found'}), 404

        user_id = get_jwt_identity()
        if ad.seller_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403

        data = request.get_json()
        ad.title = data.get('title', ad.title)
        ad.description = data.get('description', ad.description)
        ad.price = data.get('price', ad.price)
        ad.image_url = data.get('image_url', ad.image_url)
        ad.status = data.get('status', ad.status)

        db.session.commit()
        return jsonify({'msg': 'Ad updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update ad', 'details': str(e)}), 500


# Delete an Ad
@ad_bp.route('/ads/<int:ad_id>', methods=['DELETE'])
@jwt_required()
def delete_ad(ad_id):
    try:
        ad = Ad.query.get(ad_id)
        if not ad:
            return jsonify({'error': 'Ad not found'}), 404

        user_id = get_jwt_identity()
        if ad.seller_id != user_id:
            return jsonify({'error': 'Unauthorized'}), 403

        db.session.delete(ad)
        db.session.commit()
        return jsonify({'msg': 'Ad deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete ad', 'details': str(e)}), 500
