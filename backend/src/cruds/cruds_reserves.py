from typing import Union
from src.db import db
from bson.objectid import ObjectId
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer


logger = setup_logger(__name__)

collection_reservations = db.reservations


# 予約詳細取得
def get_reserve(id: str):
    logger.debug(id)
    reserve = collection_reservations.find_one({"_id": ObjectId(id)})
    return db_collection_serializer(reserve)


# 予約情報変更
def update_reserve(id: str, data: dict) -> Union[dict, bool]:
    reserve = collection_reservations.find_one({"_id": ObjectId(id)})
    if reserve:
        updated_reserve = collection_reservations.update_one(
            {"_id": ObjectId(id)}, {"$set": data}
        )
        if updated_reserve.modified_count > 0:  # modified_count＝変更箇所の数
            new_reserve = collection_reservations.find_one({"_id": ObjectId(id)})
            return db_collection_serializer(new_reserve)
    return False
