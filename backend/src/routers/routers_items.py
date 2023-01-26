from fastapi import APIRouter, HTTPException
from fastapi import Request, Response
from fastapi.encoders import jsonable_encoder
from src.utils.logger.logger import setup_logger

import src.cruds.cruds_items as items_crud

logger = setup_logger(__name__)


router = APIRouter(
    prefix="/users",  # エンドポイントの頭のURL
    tags=["users"],  # FastAPI Swagger /docsの分類
)


# API_No.5 物品登録（company_id未取得）
@router.post("/{id}/items")
def create_item(request: Request, response: Response, data: dict):
    item = jsonable_encoder(data)
    res = items_crud.create_item(item)
    logger.debug("物品登録router")
    if res:
        return res
    raise HTTPException(status_code=404, detail="物品登録ができませんでした。")


# API_No.6 物品一覧取得
@router.get("/{id}/items")
def get_user_items(id: str):
    items_list = items_crud.get_user_items(id=id)
    logger.debug(id)
    logger.debug(items_list)
    if not items_list:  # listが空[]の場合
        raise HTTPException(status_code=404, detail="物品がありませんでした。")
    logger.debug("ユーザ物品一覧router")
    return items_list


# API_No.7 物品詳細取得
@router.get("/{id}/items/{item_id}")
def get_user_item(item_id: str):
    item = items_crud.get_user_item(item_id=item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="指定の物品がありませんでした。")
    logger.debug("ユーザー物品詳細router")
    return item
