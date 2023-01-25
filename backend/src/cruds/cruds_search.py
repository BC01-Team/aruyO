from typing import Union
from src.db import db
from bson.objectid import ObjectId
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer


logger = setup_logger(__name__)

# first_testDBのexhibitsコレクションを取得
collection_exhibits = db.exhibits


# API_No.9 検索語が出品物の名前と完全一致する出品物を取得
def get_search_word(key: str):
    logger.debug("検索crud")
    # mongoDB findでドキュメント取得し、listに追加
    search_word = collection_exhibits.find({"info.name":key})
    search_word_result = []
    for document in search_word:
        logger.debug(document)
        search_word_result.append(db_collection_serializer(document))
    return search_word_result
