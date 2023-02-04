from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from src.utils.logger.logger import setup_logger

import src.cruds.search as search_crud

logger = setup_logger(__name__)
router = APIRouter(
    prefix="/search",  # エンドポイントの頭のURL
    tags=["search"],  # FastAPI Swagger /docsの分類
)


# ２種類の検索の組み合わせ。
#  1.ログインユーザーで、位置情報を持っている → キーワード検索+距離検索APIへ。
#  2.未ログインで位置情報を持たない → キーワード検索APIへ。
@router.post("/")
def get_search(data: dict):
    search_data = jsonable_encoder(data)
    if search_data["info"]["location"]:
        logger.debug("位置情報アリ")
        res = search_crud.get_search_both(search_data)
    else:
        logger.debug("位置情報ナシ")
        key = search_data["key"]
        res = search_crud.get_search_word(key)
    return res


# POSTのdata形式
# {
#   "key":"キーワード" ,
#   "info": {
#            "location":[]
#           }
# }
