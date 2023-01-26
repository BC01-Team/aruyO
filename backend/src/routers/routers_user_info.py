from fastapi import APIRouter, HTTPException, Cookie
from src.utils.logger.logger import setup_logger
from typing import Optional

import src.cruds.cruds_usersInfo as usersInfo_crud
import src.utils.auth.auth as auth

logger = setup_logger(__name__)
router = APIRouter(
    prefix="/users",  # エンドポイントの頭のURL
    tags=["users"],  # FastAPI Swagger /docsの分類
)


# API_No.8-1 予約一覧取得(借りる予約)
@router.get("/{id}/borrow")
def get_borrow_list(id: str, session_id: Optional[str] = Cookie(None)) -> list:
    logger.debug("lentパス通過、認証前")
    if auth.is_login(session_id):
        logger.debug("lent認証後")
        res = usersInfo_crud.get_borrow_list(id=id)
        logger.debug(res)
        return res
    raise HTTPException(status_code=400, detail="ログイン情報がありません")



# API_No.8-2 予約一覧取得(貸す予約)
@router.get("/{id}/lent")
def get_lent_list(id: str, session_id: Optional[str] = Cookie(None)) -> list:
    logger.debug("lentパス通過、認証前")
    if auth.is_login(session_id):
        logger.debug("lent認証後")    
        res = usersInfo_crud.get_lent_list(id=id)
        logger.debug(res)
        return res
    raise HTTPException(status_code=400, detail="ログイン情報がありません")