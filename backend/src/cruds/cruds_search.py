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


# 近傍検索
# ユーザーの会社位置を起点とし、物品リスト内のlocation情報との近傍検索
def get_search_near(data) -> list:
    nears = []
    # ユーザーの会社の位置情報（緯度経度）を取り出す
    location = data["info"]["location"]
    logger.debug(location)
    # 検索ターゲット(物品の"location")：検索起点（会社の"info.location"）でqueryに代入
    # $maxDistanceで距離指定（ラジアン距離：日本ではおおよそ1km＝0.009らしい）。
    # 取得結果はlimitで指定。
    query = {"location": SON([("$near", location), ("$maxDistance", 0.1)])}
    for document in collection_items.find(query).limit(5):
        # 自社の物品は排除する
        if document["location"] != location:
            nears.append(db_collection_serializer(document))
    return nears
