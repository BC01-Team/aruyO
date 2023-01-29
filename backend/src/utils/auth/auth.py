import redis
import os
from passlib.context import CryptContext
import sys
sys.path.append("../")
# :/app/src# python utils/auth/auth.py 
from src.db import db
from src.utils.serializer.serializer import db_collection_serializer
import uuid
from fastapi import APIRouter, HTTPException, Response, Cookie,status
from pydantic import BaseModel,Field
import json
from typing import Optional

router = APIRouter()

# redis-serverとの接続　host:コンテナservice名
HOST = os.environ.get("REDIS_URL")
pool = redis.ConnectionPool(host=HOST, port=6379, db=0)
r = redis.StrictRedis(connection_pool=pool)

# リクエストの都度行われる処理をする関数
def is_login(session_id: Optional[str] = Cookie(None)):
# cookieからsession_id取り出す
    res = {"session_id": session_id}
    session_id = res["session_id"]
    if session_id is None:
       return False
    print(session_id)
# session_idの存在ck
    if r.exists(session_id) == 0:
      return False
    return True


# print("r.get",r.get("302bc946-9c81-11ed-bc1d-0242ac170006"))

# session_idのuser情報の文字形式が...なので取得あきらめる
# session_exit = r.get(session_id).decode('utf-8')
# print("session_exit", type(session_exit))
# session_exit_dict = json.loads(session_exit)
# print("session_exit", type(session_exit_dict)) 
    

# redisにセッション保存
  # user_str = json.dumps(user)
  # user_bytes = bytes(user_str, 'utf-8')
  # r.set(session_id, user_bytes, ex=6000000)
  # print("r", r.get(session_id))

# mock_data post
# def create_post(body):
#     collection.insert_many([body])
#     return {'post': "ok"}

# create_post(mock_data)

#find "staff.password":"password"ハッシュ化した文字列
# mock_data_find = {
#     "info.email": "info@mercari.com",
#     "staff.password": "$2b$12$/13tMLgoH.Qn3rYOAbXK6.nfTwN/PXNDKp.2HsUqVkRkZJuW3m/iS"
#     }