from fastapi import APIRouter, HTTPException
from fastapi import Request, Response
from fastapi.encoders import jsonable_encoder
from src.utils.logger.logger import setup_logger

import src.cruds.cruds_items as items_crud

logger = setup_logger(__name__)


router = APIRouter(
    prefix="/items",  # エンドポイントの頭のURL http://localhost:8080/items
    tags=["items"],  # FastAPI Swagger /docsの分類
)


# API_No.5 出品物登録（company_id未取得）
@router.post("/")
def create_item(request: Request, response: Response, data: dict):
    item = jsonable_encoder(data)
    res = items_crud.create_item(item)
    logger.debug("出品物登録router")
    if res:
        return res
    raise HTTPException(status_code=404, detail="出品物登録ができませんでした。")


# API_No.6 出品物一覧取得
@router.get("/")
def get_items():
    items_list = items_crud.get_items()
    if not items_list:  # listが空[]の場合
        raise HTTPException(status_code=404, detail="出品物がありませんでした。")
    logger.debug("出品物一覧router")
    return items_list


# API_No.7 出品物詳細取得
@router.get("/{id}")
def get_item(id: str):
    item = items_crud.get_item(id=id)
    if item is None:
        raise HTTPException(status_code=404, detail="指定の出品物がありませんでした。")
    logger.debug("出品物詳細router")
    return item
