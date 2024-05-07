from functools import wraps
import os
from flask import request, jsonify
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from pymongo import MongoClient

client = MongoClient(os.getenv('MONGO_URI'))
database = client[os.getenv('MONGO_DB')]
user_collection = database["users"]

def token_required(optional=False):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = None
            if 'Authorization' in request.headers:
                token = request.headers['Authorization'].split(" ")[1]
            if not token:
                if optional:
                    return f(None, *args, **kwargs)
                else:
                    return jsonify({'message': 'Token is missing!'}), 401
            
            try:
                data = jwt.decode(token, os.getenv('APP_SECRET_KEY'), algorithms=["HS256"])
                current_user = user_collection.find_one({'email': data['email']})
                if not current_user:
                    return jsonify({'message': 'User not found!'}), 401
            except ExpiredSignatureError:
                return jsonify({'message': 'Token has expired!'}), 401
            except InvalidTokenError:
                return jsonify({'message': 'Invalid token!'}), 401
            
            return f(current_user, *args, **kwargs)
        return decorated_function
    return decorator