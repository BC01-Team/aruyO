from fastapi import APIRouter, HTTPException, Cookie
from fastapi import Request, Response
from fastapi.encoders import jsonable_encoder
from src.utils.logger.logger import setup_logger
from typing import Optional

import src.cruds.cruds_items as items_crud
import src.utils.auth.auth as auth

logger = setup_logger(__name__)
router = APIRouter(
    prefix="/items",  # エンドポイントの頭のURL
    tags=["items"],  # FastAPI Swagger /docsの分類
)


# API_No.6-2 全ユーザーの物品一覧取得
@router.get("/")
def get_all_items(session_id: Optional[str] = Cookie(None)) -> list:
    logger.debug("get_all_itemsパス通過、認証前")
    if auth.is_login(session_id):
        logger.debug("get_all_items認証後")
        res = items_crud.get_all_items()
        if not res:  # listが空[]の場合
            raise HTTPException(status_code=404, detail="物品がありませんでした。")
        logger.debug(res)
        return res
    raise HTTPException(status_code=400, detail="ログイン情報がありません")


# API_No.7-2 物品詳細取得
@router.get("/{id}")
def get_item(
    id: str, session_id: Optional[str] = Cookie(None)
) -> dict:
    logger.debug("get_itemパス通過、認証前")
    if auth.is_login(session_id):
        logger.debug("get_item認証後")
        res = items_crud.get_item(id=id)
        if res is None:
            raise HTTPException(status_code=404, detail="指定の物品がありませんでした。")
        logger.debug(res)
        return res
    raise HTTPException(status_code=400, detail="ログイン情報がありません")