from fastapi import APIRouter, HTTPException
from src.utils.logger.logger import setup_logger

import src.cruds.cruds_exhibits as exhibits_crud

logger = setup_logger(__name__)


router = APIRouter(
    prefix="/exhibits",  # エンドポイントの頭のURL http://localhost:8080/exhibit
    tags=["exhibits"],  # http://127.0.0.1/docsの分類
)


# API_No.6 出品物一覧取得
@router.get("/")
def get_exhibits():
    exhibits_list = exhibits_crud.get_exhibits()
    if not exhibits_list:  # listが空[]の場合
        raise HTTPException(status_code=404, detail="出品物がありませんでした。")
    logger.debug("出品物router")
    return exhibits_list
