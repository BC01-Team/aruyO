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




