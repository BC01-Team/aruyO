from typing import Union
from src.db import db
from bson.objectid import ObjectId
from src.utils.logger.logger import setup_logger
from src.utils.serializer.serializer import db_collection_serializer


logger = setup_logger(__name__)

collection_companies = db.companies
collection_exhibits = db.exhibits
collection_reservations = db.reservations
collection_statuses = db.statuses

# API_No.8-1 予約一覧取得(借りる予約)
def get_borrow_list(id: str) -> list:
    borrow_list = []
    logger.debug(id)
    for borrow in collection_reservations.find({"borrower._id": id}, limit=20):
        logger.debug(borrow)
        borrow_list.append(db_collection_serializer(borrow))
    logger.debug(borrow_list)
    return borrow_list


# API_No.8-2 予約一覧取得(貸す予約)
def get_lent_list(id: str) -> list:
    lent_list = []
    for lent in collection_reservations.find({"lender._id": id}, limit=20):
        lent_list.append(db_collection_serializer(lent))
    return lent_list