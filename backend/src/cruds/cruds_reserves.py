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
    logger.debug("get_reserve 通過")
    return db_collection_serializer(reserve)
