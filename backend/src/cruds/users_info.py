from typing import Union
from src.db import db
from bson.objectid import ObjectId
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer


logger = setup_logger(__name__)

collection_companies = db.companies
collection_items = db.items
collection_reservations = db.reservations
# collection_statuses = db.statuses


# API_No.2 アカウント情報取得
def get_user(id: str):
    logger.debug(id)
    # mongoDB findでドキュメント取得
    user = collection_companies.find_one({"_id": ObjectId(id)})
    return db_collection_serializer(user)


# API_No.5 物品登録
def create_item(data: dict) -> Union[dict, bool]:
    logger.debug(data)
    # mongoDB insert_oneでドキュメント登録後、find_oneで登録値を取得
    item = collection_items.insert_one(data)
    new_item = collection_items.find_one({"_id": item.inserted_id})
    if new_item:
        return db_collection_serializer(new_item)
    return False


# API_No.6 ユーザーの物品一覧取得
def get_user_items(id: str):
    logger.debug(id)
    # mongoDB findでドキュメント取得し、listに追加
    items = collection_items.find({"company_id": id})
    items_list = []
    for document in items:
        items_list.append(db_collection_serializer(document))
    return items_list


# API_No.7 物品詳細取得
def get_user_item(item_id: str):
    logger.debug(item_id)
    # mongoDB findでドキュメント取得
    item = collection_items.find_one({"_id": ObjectId(item_id)})
    return db_collection_serializer(item)


# API_No.8-1 予約一覧取得(借りる予約)
def get_borrow_list(id: str) -> list:
    borrow_list = []
    logger.debug(id)
    for borrow in collection_reservations.find({"borrower.id": id}, limit=20):
        logger.debug(borrow)
        borrow_list.append(db_collection_serializer(borrow))
    logger.debug(borrow_list)
    return borrow_list


# API_No.8-2 予約一覧取得(貸す予約)
def get_lent_list(id: str) -> list:
    lent_list = []
    for lent in collection_reservations.find({"lender.id": id}, limit=20):
        lent_list.append(db_collection_serializer(lent))
    return lent_list
