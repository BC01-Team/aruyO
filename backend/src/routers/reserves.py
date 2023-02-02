from fastapi import APIRouter, HTTPException, Cookie
from src.utils.logger.logger import setup_logger
from fastapi.encoders import jsonable_encoder
from typing import Optional

import src.cruds.reserves as reserve_crud
import src.utils.auth.auth as auth

logger = setup_logger(__name__)
router = APIRouter(
    prefix="/reserves",  # エンドポイントの頭のURL
    tags=["reserves"],  # FastAPI Swagger /docsの分類
)


# API_No.10 予約登録
@router.post("/")
def create_reserve(data: dict, session_id: Optional[str] = Cookie(None)):
    logger.debug("auth前")
    if auth.is_login(session_id):
        reserve = jsonable_encoder(data)
        res = reserve_crud.create_reserve(reserve)
        if res:
            return res
        raise HTTPException(status_code=404, detail="予約登録ができませんでした")
    raise HTTPException(status_code=400, detail="ログイン情報がありません")


# API_No.11 予約詳細取得
@router.get("/{id}")
def get_reserve(id: str, session_id: Optional[str] = Cookie(None)):
    if auth.is_login(session_id):
        reserve = reserve_crud.get_reserve(id=id)
        if reserve is None:
            raise HTTPException(status_code=404, detail="予約がありません")
        logger.debug("予約詳細確認")
        return reserve
    raise HTTPException(status_code=400, detail="ログイン情報がありません")


# API_No.12 予約情報変更
@router.put("/{id}")
def update_reserve(id: str, data: dict):  # dataはrequestbodyにreserveコレクションから_idを抜いたものをいれた。余計な部分が多いのでステータスだけにしたい。
    if auth.is_login(session_id):
        reserve = jsonable_encoder(data)
        logger.debug(reserve)
        res = reserve_crud.update_reserve(id, reserve)
        if res:
            return res
        raise HTTPException(status_code=404, detail="予約がありません")
    raise HTTPException(status_code=400, detail="ログイン情報がありません")


# API_No. 予約ステータス変更　QR
@router.put("/status/{id}")
def update_reserve(id: str, data: dict):
    reserve = jsonable_encoder(data)
    logger.debug(reserve)
    res = reserve_crud.update_reserve(id, reserve)
    if res:
        return res
    raise HTTPException(status_code=404, detail="予約がありません")

