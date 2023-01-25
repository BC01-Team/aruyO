import redis
import os
from passlib.context import CryptContext
import sys
sys.path.append("../")
# :/app/src# python utils/auth/auth.py 
from src.db import db
from src.utils.serializer.serializer import db_collection_serializer
import uuid
from fastapi import APIRouter, HTTPException, Response, Cookie
import asyncio
from pydantic import BaseModel,Field
import json
from typing import Optional


router = APIRouter()

HOST = os.environ.get("REDIS_URL")

# redis-serverとの接続　host:コンテナservice名
pool = redis.ConnectionPool(host=HOST, port=6379, db=0)
r = redis.StrictRedis(connection_pool=pool)




# 追加した値を取得して表示します
# hogehoge = r.get('hogehoge')
# print(hogehoge.decode())

# 追加した値を削除します
# result = r.delete('hoge')

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

"$2b$12$/13tMLgoH.Qn3rYOAbXK6.nfTwN/PXNDKp.2HsUqVkRkZJuW3m/iS"

# companyコレクション
collection = db.companies

# mock_data post
def create_post(body):
    collection.insert_many([body])
    return {'post': "ok"}

# create_post(mock_data)

#find "staff.password":"password"ハッシュ化した文字列
mock_data_find = {
    "info.email": "info@mercari.com",
    "staff.password": "$2b$12$/13tMLgoH.Qn3rYOAbXK6.nfTwN/PXNDKp.2HsUqVkRkZJuW3m/iS"
    }



# user
def get_user(email):
    find_user = { "info.email": email }
    for data in collection.find(filter=find_user):
      user = data

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




class RequestBody(BaseModel):
  email: str = Field(example="info@mercari.com")
  password: str = Field(example="password")


#api router
@router.post("/login")
def create_sessoion(body:RequestBody,response: Response):
  email = body.email
  password = body.password
  print(email, password)

  # user認証
  user = authenticate_user(email,password)

# session_id発行 
  session_id:str = str(uuid.uuid1())
  print("session_id",session_id)
  print(user)

# redisにセッション保存
  user_str = json.dumps(user)
  user_bytes = bytes(user_str, 'utf-8')
  r.set(session_id, user_bytes, ex=6000)
  # r.expire(session_id,5) #有効期限5秒
  print("r", r.get(session_id))

# session_id set_cookie user情報をreturnする
  response.set_cookie(key="session_id", value=session_id)
  return {"user": user }


@router.post("/logout")
async def save_cookie(response: Response):
    response.set_cookie(key="session_id", value="")
    #status返す
    return {"message": "logout ok"}


r.set("hogekey","hogevalue",ex=10)

# リクエストの都度行われる処理をする関数
@router.get("/cookie")
def get_cookie(session_id: Optional[str] = Cookie(None)):
# cookieから取り出す
    res =  {
        "session_id": session_id
    }
    
    session_id = res["session_id"]
    print(session_id)

# redisのsession_id存在CK
    return r.get("hogekey")

print("r.get",r.get("ff0136c0-9c7c-11ed-91de-0242ac170006"))


