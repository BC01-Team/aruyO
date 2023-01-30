from src.db import db
from bson.objectid import ObjectId
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer


logger = setup_logger(__name__)

collection_items = db.items


# API_No.6-2 全ユーザーの物品一覧取得
def get_all_items():
    logger.debug("全ユーザーの物品一覧取得")
    # mongoDB findでドキュメント取得し、listに追加
    items = collection_items.find()
    items_list = []
    for document in items:
        items_list.append(db_collection_serializer(document))
    return items_list


# API_No.7-2 物品詳細取得
def get_item(id: str):
    logger.debug(id)
    # mongoDB findでドキュメント取得
    item = collection_items.find_one({"_id": ObjectId(id)})
    return db_collection_serializer(item)
