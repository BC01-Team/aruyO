from typing import Union
from bson.objectid import ObjectId
from src.db import db
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer


logger = setup_logger(__name__)

# 物品コレクションを取得
collection_items = db.items




