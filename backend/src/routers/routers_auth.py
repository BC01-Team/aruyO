import redis
import os
import sys
import uuid
from fastapi import APIRouter, HTTPException, Response, Cookie,status
import src.cruds.cruds_auth as auth_crud
import src.schemas.schemas_auth as auth_schema
router = APIRouter()

# redis-serverとの接続　host:コンテナservice名
HOST = os.environ.get("REDIS_URL")
pool = redis.ConnectionPool(host=HOST, port=6379, db=0)
r = redis.StrictRedis(connection_pool=pool)

# login 
@router.post("/login")
def create_sessoion(body:auth_schema.RequestBody,response: Response):
  email = body.email
  password = body.password
  print(email, password)

  # user認証
  user_id = auth_crud.authenticate_user(email,password)
  if not user_id:
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password"
    )

  # session_id発行 
  session_id:str = str(uuid.uuid1())
  print("session_id",session_id)

  # redisにセッション保存
  r.set(session_id, user_id)
  print("r.get", r.get(session_id))

  # session_id set_cookie してuser情報をreturnする
  response.set_cookie(key="session_id", value=session_id)
  return {"message": "login ok"}

# logout cookieに空文字挿入
@router.post("/logout")
async def save_cookie(response: Response):
    response.set_cookie(key="session_id", value="")
    return {"message": "logout ok"}