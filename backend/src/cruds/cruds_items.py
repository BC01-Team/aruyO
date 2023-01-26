from typing import Union
from bson.objectid import ObjectId
from src.db import db
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer


logger = setup_logger(__name__)

# 出品物コレクションを取得
collection_items = db.items


# API_No.5 出品物登録（company_id未取得）
def create_item(data: dict) -> Union[dict, bool]:
    logger.debug("出品物登録crud")
    # mongoDB insert_oneでドキュメント登録後、find_oneで登録値を取得
    item = collection_items.insert_one(data)
    new_item = collection_items.find_one({"_id": item.inserted_id})
    if new_item:
        return db_collection_serializer(new_item)
    return False


# API_No.6 出品物一覧取得
def get_items():
    logger.debug("出品物一覧crud")
    # mongoDB findでドキュメント取得し、listに追加
    items = collection_items.find()
    items_list = []
    for document in items:
        logger.debug(document)
        items_list.append(db_collection_serializer(document))
    return items_list


# API_No.7 出品物詳細取得
def get_item(id: str):
    logger.debug("出品物詳細crud")
    # mongoDB findでドキュメント取得
    item = collection_items.find_one({"_id": ObjectId(id)})
    return db_collection_serializer(item)
