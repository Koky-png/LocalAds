from flask import Blueprint, request, jsonify
from models import db, Message, Ad, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

message_bp = Blueprint('message_bp', __name__)

# Send a Message
@message_bp.route('/messages', methods=['POST'])
@jwt_required()
def send_message():
    data = request.get_json()
    ad_id = data.get('ad_id')
    content = data.get('content')
    user_id = get_jwt_identity()

    if not ad_id or not content:
        return jsonify({'error': 'Missing required fields'}), 400

    # Check if Ad exists
    ad = Ad.query.get(ad_id)
    if not ad:
        return jsonify({'error': 'Ad not found'}), 404

    new_message = Message(ad_id=ad_id, user_id=user_id, content=content, timestamp=datetime.utcnow())
    db.session.add(new_message)
    db.session.commit()

    return jsonify({'msg': 'Message sent successfully', 'message_id': new_message.message_id}), 201


# Get Messages for a Specific Ad
@message_bp.route('/ads/<int:ad_id>/messages', methods=['GET'])
def get_messages_for_ad(ad_id):
    messages = Message.query.filter_by(ad_id=ad_id).all()
    
    if not messages:
        return jsonify({'error': 'No messages found for this ad'}), 404

    message_list = [{
        'message_id': msg.message_id,
        'ad_id': msg.ad_id,
        'user_id': msg.user_id,
        'content': msg.content,
        'timestamp': msg.timestamp
    } for msg in messages]

    return jsonify(message_list), 200


# Get Messages Sent by a User
@message_bp.route('/users/<int:user_id>/messages', methods=['GET'])
def get_messages_by_user(user_id):
    messages = Message.query.filter_by(user_id=user_id).all()

    if not messages:
        return jsonify({'error': 'No messages found for this user'}), 404

    message_list = [{
        'message_id': msg.message_id,
        'ad_id': msg.ad_id,
        'user_id': msg.user_id,
        'content': msg.content,
        'timestamp': msg.timestamp
    } for msg in messages]

    return jsonify(message_list), 200


# Delete a Message
@message_bp.route('/messages/<int:message_id>', methods=['DELETE'])
@jwt_required()
def delete_message(message_id):
    message = Message.query.get(message_id)
    
    if not message:
        return jsonify({'error': 'Message not found'}), 404

    user_id = get_jwt_identity()
    if message.user_id != user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(message)
    db.session.commit()

    return jsonify({'msg': 'Message deleted successfully'}), 200
