import redis
import os
from passlib.context import CryptContext
import sys
sys.path.append("../")
# :/app/src# python utils/auth/auth.py 
from src.db import db
import uuid
from fastapi import APIRouter, HTTPException, Response

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


# login password hash
def get_password_hash(password):
    return pwd_context.hash(password)


print(get_password_hash("password"))
"$2b$12$/13tMLgoH.Qn3rYOAbXK6.nfTwN/PXNDKp.2HsUqVkRkZJuW3m/iS"

# db mock create
mock_data =  {
      "info": {
        "_id": "63cd1b0420cfbda6799d59b1",
        "name": "株式会社メルカリ",
        "Japan_Corporate_Number": "6010701027558",
        "address": "〒106-6108 東京都港区六本木６丁目１０番１号",
        "hp_url": "https://www.google.com/",
        "latitude": "35.660205",
        "longitude": "139.729202",
        "phone": "0123456789",
        "email": "info@mercari.com",
        "account": "stripe"
      },
      "staff": [
        {
          "id": "1",
          "name": "門後David",
          "email": "david@mercari.com",
          "password": "$2b$12$/13tMLgoH.Qn3rYOAbXK6.nfTwN/PXNDKp.2HsUqVkRkZJuW3m/iS",
          "role": {
            "admin": "1",
            "exhibit": "1",
            "reservation": "1"
          }
        }
      ],
      "exhibits_id": [
        "63cd1b0420cfbda6799aaaaa"
      ],
      "borrower_history": [
        "63cd1b0420cfbda6799wwwww"
      ],
      "reservations_history": []
    }


# companyコレクション
collection = db.company

# mock_data post
def create_post(body):
    collection.insert_many([body])
    return {'post': "ok"}

# create_post(mock_data)

#find 
mock_data_find = {
    "info.email": "info@mercari.com",
    "staff.password": "$2b$12$/13tMLgoH.Qn3rYOAbXK6.nfTwN/PXNDKp.2HsUqVkRkZJuW3m/iS"
    }

none_mock_data_find = {
    "info.email": "none",
    "staff.password": "none"
    }

def get_user(body):
    # credentials_exception記載する　tryとraise
    for user in collection.find(filter=body):
        if user is None:
           return "error" #Noneがreturnされる
        return  user

# print(get_user(mock_data_find))
# print(get_user(none_mock_data_find))

# session_id発行 
session_id:str = str(uuid.uuid1())
print(session_id)

# redisにセッション保存
r.set("test", "test_value", ex=5) #有効期限5秒
print(r.get("test"))
print(r.get("X")) #None



#set_coockie session_id有


#set_coockie session_id空

#cookie取り出す

#api router
@router.get("/login")
#find
async def save_cookie(response: Response):
    response.set_cookie(key="sample_cookie", value="sample_cookie_value")
    return "ok"
   

@router.post("/logout")
async def save_cookie(response: Response):
    response.set_cookie(key="sample_cookie", value="")
    return "ok"


# リクエストの都度行われる処理をする関数
# cookieから取り出す
# セッションからuser情報取得する


# 



