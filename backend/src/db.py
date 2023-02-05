from pymongo import MongoClient
import os

MONGO_DATABASE_URL = os.environ.get("MONGO_DATABASE_URL") 

DATABASE_URL=MONGO_DATABASE_URL

print(DATABASE_URL)

client = MongoClient(DATABASE_URL)

#接続test用の名前。変更可
db = client.first_test
