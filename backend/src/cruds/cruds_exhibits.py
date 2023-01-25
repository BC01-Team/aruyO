from typing import Union
from bson.objectid import ObjectId
from src.db import db
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer


logger = setup_logger(__name__)

# 出品物コレクションを取得
collection_exhibits = db.exhibits


# API_No.5 出品物登録
def create_exhibit(data: dict) -> Union[dict, bool]:
    logger.debug("出品物登録crud")
    # mongoDB insert_oneでドキュメント登録後、find_oneで登録値を取得
    exhibit = collection_exhibits.insert_one(data)
    new_exhibit = collection_exhibits.find_one({"_id": exhibit.inserted_id})
    if new_exhibit:
        return db_collection_serializer(new_exhibit)
    return False


# API_No.6 出品物一覧取得
def get_exhibits():
    logger.debug("出品物一覧crud")
    # mongoDB findでドキュメント取得し、listに追加
    exhibits = collection_exhibits.find()
    exhibits_list = []
    for document in exhibits:
        logger.debug(document)
        exhibits_list.append(db_collection_serializer(document))
    return exhibits_list


# API_No.7 出品物詳細取得
def get_exhibit(id: str):
    logger.debug("出品物詳細crud")
    # mongoDB findでドキュメント取得
    exhibit = collection_exhibits.find_one({"_id": ObjectId(id)})
    return db_collection_serializer(exhibit)
