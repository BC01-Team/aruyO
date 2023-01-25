from fastapi import APIRouter, HTTPException
from fastapi import Request, Response
from src.utils.logger.logger import setup_logger
from fastapi.encoders import jsonable_encoder

import src.cruds.cruds_usersInfo as usersInfo_crud

logger = setup_logger(__name__)
router = APIRouter(
    prefix="/users",  # エンドポイントの頭のURL http://localhost:8080/exhibit
    tags=["users"],  # http://127.0.0.1/docsの分類
)


# API_No.8-1 予約一覧取得(借りる予約)
@router.get("/{id}/borrow")
def get_borrow_list(id: str) -> list:
    logger.debug("borrowパス通過")
    res = usersInfo_crud.get_borrow_list(id=id)
    logger.debug(res)
    return res



# API_No.8-2 予約一覧取得(貸す予約)
@router.get("/{id}/lent")
def get_lent_list(id: str) -> list:
    logger.debug("lentパス通過")
    res = usersInfo_crud.get_lent_list(id=id)
    return res