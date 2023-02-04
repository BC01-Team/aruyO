from pymongo import MongoClient
import os


MONGO_DATABASE_NAME = os.environ.get("MONGO_DATABASE_NAME")  # mongodb
MONGO_DATABASE_USER = os.environ.get("MONGO_DATABASE_USER")  # root
MONGO_DATABASE_PASSWORD = os.environ.get("MONGO_DATABASE_PASSWORD")  # password
MONGO_DATABASE_CONTAINER_NAME = os.environ.get(
    "MONGO_DATABASE_CONTAINER_NAME"
)  # mongo_db
MONGO_DATABASE_PORT = int(os.environ.get("MONGO_DATABASE_PORT"))  # 27017

DATABASE_URL = DATABASE_URL = "%s://%s:%s@%s:%d" % (
    MONGO_DATABASE_NAME,
    MONGO_DATABASE_USER,
    MONGO_DATABASE_PASSWORD,
    MONGO_DATABASE_CONTAINER_NAME,
    MONGO_DATABASE_PORT,
)

print(DATABASE_URL)

client = MongoClient(DATABASE_URL)

# 本番用
db = client.aruyo

# 接続test用の名前。変更可
# db = client.first_test
