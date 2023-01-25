from pymongo import GEO2D
from db import db

collection_companies = db.companies
collection_exhibits = db.exhibits

# コンテナ初回作成時にfastapiコンテナ内のapp/srcで```# python create_geospatial.py```を実行 

# companyコレクションとexhibitsコレクションのlcationキーにgeospatialインデックスを作成する。
collection_companies.create_index([("info.location", GEO2D)])
collection_exhibits.create_index([("location", GEO2D)])

