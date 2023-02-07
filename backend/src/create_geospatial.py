from pymongo import GEOSPHERE
from db import db

collection_companies = db.companies
collection_items = db.items

# コンテナ初回作成時にfastapiコンテナ内のapp/srcで```# python create_geospatial.py```を実行

# companyコレクションとexhibitsコレクションのlcationキーにgeospatialインデックスを作成する。
collection_companies.create_index([("info.location", GEOSPHERE)])
collection_items.create_index([("location", GEOSPHERE)])

