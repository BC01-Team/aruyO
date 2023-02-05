from fastapi import FastAPI, Body
from starlette.middleware.cors import CORSMiddleware

from src.routers import user_info
from src.routers import search
from src.routers import reserves
from src.routers import auth
from src.routers import items
from src.routers import stripe

from src.db import db

# log設定
from src.utils.logger.logger import setup_logger
logger = setup_logger(__name__)

app = FastAPI()


origins = ["http://localhost:3000"]

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"]
)

# ルーティング設定
app.include_router(user_info.router)
app.include_router(search.router)
app.include_router(reserves.router)
app.include_router(auth.router)
app.include_router(items.router)
app.include_router(stripe.router)


# 接続テスト用　削除可
@app.get("/")
def read_root():
    logger.debug("pass")
    return {"test": "get test ok"}

# mongo_dbとの接続テスト用　削除可　postしたdataは下記
# {
#   "payload":{
#     "_id" : "5fe1661f03100427fb1e8cd3",
#     "title" : "投稿の編集",
#     "text" : "fugefuge"
#   }
# }
@app.post("/")
def create_post(body=Body(...)):
    post = body['payload']
    db.collection.insert_one(post)
    return {'post': "ok"}
