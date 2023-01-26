from src.utils.serializer.serializer import db_collection_serializer
import uuid
from src.db import db
from passlib.context import CryptContext
import redis
import os

# companyコレクション
collection = db.companies

# redis-serverとの接続　host:コンテナservice名
HOST = os.environ.get("REDIS_URL")
pool = redis.ConnectionPool(host=HOST, port=6379, db=0)
r = redis.StrictRedis(connection_pool=pool)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_user(email):
    find_user = { "info.email": email }
    print("find_user", find_user)
    user = collection.find_one(find_user)
    print("user",user)
    if not user:
      return False
    return db_collection_serializer(user)

def authenticate_user(email,password):
    user =  get_user(email)
    if not user:
      return False
    hashed_password = user['staff'][0]["password"]
    print("ck",hashed_password)
    if not verify_password(password,hashed_password):
        return False
    return user
