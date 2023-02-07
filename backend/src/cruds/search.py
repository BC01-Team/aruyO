from src.db import db
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer
from bson.son import SON

logger = setup_logger(__name__)

# 出品物コレクションを取得
collection_items = db.items


# API_No.9.0 全ユーザーの出品物一覧取得
def get_items():
    logger.debug("出品物一覧crud")
    # mongoDB findでドキュメント取得し、listに前から100件まで追加(登録が新しい順)
    items = collection_items.find()
    items_list = []
    for document in items:
        if len(items_list) < 100:
            items_list.insert(0, db_collection_serializer(document))
    return items_list


# API_No.9.1 検索語keyの部分一致一覧取得（info.フィールド3つのいずれかに含まれる）
def get_search_word(key: str):
    logger.debug(key)
    # mongoDB findでドキュメント取得、$regexで部分一致したドキュメントをlistに追加
    search_key = collection_items.find(
        {
            "$or": [
                {"info.name": {"$regex": key}},
                {"info.detail": {"$regex": key}},
                {"info.requirements": {"$regex": key}},
            ]
        }
    )
    search_key_result = []
    for document in search_key:
        search_key_result.append(db_collection_serializer(document))
    return search_key_result


# キーワード検索+距離検索
def get_search_both(data) -> list:
    location = data["info"]["location"]
    logger.debug(location)
    key = data["key"]
    logger.debug(key)
    # mongoDB findでドキュメント取得、$regexで部分一致したドキュメントをlistに追加
    list = collection_items.find(
        {
            "$and": [
                {
                    "$or": [
                        {"info.name": {"$regex": key}},
                        {"info.detail": {"$regex": key}},
                        {"info.requirements": {"$regex": key}},
                    ]
                },
                # 距離検索を併用。検索範囲の単位はｍ。
                {
                    "location": {"$nearSphere": {
                    "$geometry": {"type": "Point", "coordinates": location},
                    "$maxDistance": 10000}}
                }
            ]
        }
    )
    search_result = []
    if list:
        for document in list:
            search_result.append(db_collection_serializer(document))
            logger.debug(search_result)
    return search_result
