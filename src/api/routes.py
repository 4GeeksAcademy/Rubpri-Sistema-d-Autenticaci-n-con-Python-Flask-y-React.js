"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)


@api.route("/token", methods=["POST"])
def create_token():
   
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email, password=password).first()

    if user:
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Bad email or password"}), 401

    # email = request.json.get("email", None)
    # password = request.json.get("password", None)
    
    # if email != "test" or password != "test":
    #     return jsonify({"msg": "Bad email or password"}), 401

    # return jsonify(access_token=access_token)


@api.route("/signup", methods=['POST'])
def signup():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    is_active = True

    new_user = User(
        email = email,
        password = password,
        is_active=is_active
    )

    db.session.add(new_user)
    db.session.commit()

    response_body = {
                "message": "New user added",
                "status": "ok",
                "transaction": new_user.serialize()
            }
    
    return response_body, 200




@jwt_required()
@api.route("/hello", methods=["GET"])
def get_hello():
    
    dictionary = {
        "message": "hello world"
    }

    return jsonify (dictionary)