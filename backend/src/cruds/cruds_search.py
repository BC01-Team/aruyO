from src.db import db
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer


logger = setup_logger(__name__)

# 出品物コレクションを取得
collection_exhibits = db.exhibits


# API_No.9 検索語keyの部分一致一覧取得（info.フィールド3つのいずれかに含まれる）
def get_search_word(key: str):
    logger.debug("検索crud")
    # mongoDB findでドキュメント取得、$regexで部分一致したドキュメントをlistに追加
    search_word = collection_exhibits.find(
        {
            "$or": [
                {"info.name": {"$regex": key}},
                {"info.detail": {"$regex": key}},
                {"info.requirements": {"$regex": key}},
            ]
        }
    )
    search_word_result = []
    for document in search_word:
        logger.debug(document)
        search_word_result.append(db_collection_serializer(document))
    return search_word_result
