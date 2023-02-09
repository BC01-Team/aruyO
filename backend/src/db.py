from pymongo import MongoClient
import os
from src.utils.logger.logger import setup_logger

logger = setup_logger(__name__)

MONGO_DATABASE_URL = os.environ.get("MONGO_DATABASE_URL") 

DATABASE_URL=MONGO_DATABASE_URL

logger.debug(DATABASE_URL)

client = MongoClient(DATABASE_URL)

# 本番用
# db = client.aruyo

# 接続test用の名前。変更可
db = client.first_test
