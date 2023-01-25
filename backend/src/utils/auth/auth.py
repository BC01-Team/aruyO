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

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

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

none_mock_data_find = {
    "info.email": "none",
    "staff.password": "none"
    }

# user
def get_user(email):
    find_user = { "info.email": email }
    for user in collection.find(filter=find_user):
      return user

print("user", get_user("info@mercari.com"))



async def authenticate_user(email,password):
    user =  await get_user(email)
    if not user:
      return False

    hashed_password = user['staff'][0]["password"]

    print("ck",hashed_password)
    if not verify_password(password,hashed_password):
        return False
    
    return user



# print(get_user(none_mock_data_find))
print("authenticate_user", authenticate_user("info@mercari.com","password"))







# print(r.get("test"))
# print(r.get("X")) #None




#api router
@router.get("/login")
#find
# user = async def get_user(email,);

# session_id発行 
# session_id:str = str(uuid.uuid1())
# print(session_id)

# redisにセッション保存
# r.set(session_id, user, ex=5) #有効期限5秒


async def save_cookie(response: Response):
    response.set_cookie(key="session_id", value=session_id) 

    #user情報返す
    return user
   

@router.post("/logout")
async def save_cookie(response: Response):
    response.set_cookie(key="sample_cookie", value="")
    #status返す
    return "ok" 


# リクエストの都度行われる処理をする関数
# cookieから取り出す
# セッションからuser情報取得する



#set_coockie session_id有


#set_coockie session_id空

#cookie取り出す

