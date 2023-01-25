from fastapi import APIRouter, HTTPException
from fastapi import Request, Response
from src.utils.logger.logger import setup_logger
from fastapi.encoders import jsonable_encoder

import src.cruds.cruds_reserves as reserve_crud

logger = setup_logger(__name__)
router = APIRouter()


# API_No.10 予約登録
@router.post("/reserves")
def create_reserve(request: Request, response: Response, data: dict):
    reserve = jsonable_encoder(data)
    res = reserve_crud.create_reserve(reserve)
    if res:
        return res
    raise HTTPException(status_code=404, detail="予約登録ができませんでした")


# API_No.11 予約詳細取得
@router.get("/reserves/{id}")
def get_reserve(id: str):
    reserve = reserve_crud.get_reserve(id=id)
    if reserve is None:
        raise HTTPException(status_code=404, detail="予約がありません")
    logger.debug("予約詳細確認")
    return reserve


# API_No.12 予約情報変更
@router.put("/reserves/{id}")
def update_reserve(id: str, data: dict):  # dataはrequestbodyにreserveコレクションから_idを抜いたものをいれた。余計な部分が多いのでステータスだけにしたい。
    reserve = jsonable_encoder(data)
    logger.debug(reserve)
    res = reserve_crud.update_reserve(id, reserve)
    if res:
        return res
    raise HTTPException(status_code=404, detail="予約がありません")

