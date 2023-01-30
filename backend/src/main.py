from fastapi import FastAPI, Body
from starlette.middleware.cors import CORSMiddleware

from src.routers import routers_user_info
from src.routers import routers_search
from src.routers import routers_reserves
from src.routers import routers_auth 
from src.routers import routers_items 

from src.db import db

# log設定
from src.utils.logger.logger import setup_logger
logger = setup_logger(__name__)

app = FastAPI()


# origins = [ ] 一旦空

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ルーティング設定
app.include_router(routers_user_info.router)
app.include_router(routers_search.router)
app.include_router(routers_reserves.router)
app.include_router(routers_auth.router)
app.include_router(routers_items.router)


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
