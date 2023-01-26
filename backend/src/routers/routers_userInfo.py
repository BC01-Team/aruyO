from fastapi import APIRouter, HTTPException
from fastapi import Request, Response
from src.utils.logger.logger import setup_logger
from fastapi.encoders import jsonable_encoder

import src.cruds.cruds_usersInfo as usersInfo_crud

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
    items_list = usersInfo_crud.get_user_items(id=id)
    logger.debug(id)
    logger.debug(items_list)
    if not items_list:  # listが空[]の場合
        raise HTTPException(status_code=404, detail="物品がありませんでした。")
    logger.debug("ユーザ物品一覧router")
    return items_list


# API_No.7 物品詳細取得
@router.get("/{id}/items/{item_id}")
def get_user_item(item_id: str):
    item = usersInfo_crud.get_user_item(item_id=item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="指定の物品がありませんでした。")
    logger.debug("ユーザー物品詳細router")
    return item


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
