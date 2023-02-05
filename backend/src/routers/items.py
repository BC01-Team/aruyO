from fastapi import APIRouter, HTTPException
from src.utils.logger.logger import setup_logger

import src.cruds.items as items_crud

logger = setup_logger(__name__)
router = APIRouter(
    prefix="/items",  # エンドポイントの頭のURL
    tags=["items"],  # FastAPI Swagger /docsの分類
)


# API_No.6-2 全ユーザーの物品一覧取得　未ログイン時も使用するため認証はなし
@router.get("/")
def get_all_items() -> list:
    res = items_crud.get_all_items()
    if not res:  # listが空[]の場合
        raise HTTPException(status_code=404, detail="物品がありませんでした。")
    logger.debug(res)
    return res


# API_No.7-2 物品詳細取得　未ログイン時も使用するため認証はなし
@router.get("/{id}")
def get_item(id: str) -> dict:
    res = items_crud.get_item(id=id)
    if res is None:
        raise HTTPException(status_code=404, detail="指定の物品がありませんでした。")
    logger.debug(res)
    return res
