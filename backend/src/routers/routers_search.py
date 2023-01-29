from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from src.utils.logger.logger import setup_logger
import src.cruds.cruds_search as search_crud
from typing import Union

logger = setup_logger(__name__)


router = APIRouter(
    prefix="/search",  # エンドポイントの頭のURL
    tags=["search"],  # FastAPI Swagger /docsの分類
)


# # API_No.9 検索語keyの部分一致一覧取得（info.フィールド3つのいずれかに含まれる）
# @router.get("/")
# def get_search_word(word: Union[str, None]):
#     logger.debug(word)
#     if word is None:  # 検索語が未入力の場合、新規登録物品100件をを返す
#         items_list = search_crud.get_items()
#         if not items_list:  # listが空[]の場合
#             raise HTTPException(status_code=404, detail="出品物がありませんでした。")
#         return items_list
#     else:  # 検索語を部分一致検索して返す
#         search_word_result = search_crud.get_search_word(key=word)
#         if not search_word_result:  # listが空[]の場合
#             raise HTTPException(
#                 status_code=404, detail="一致する結果が見つかりませんでした。キーワードを変えて再検索してください。"
#             )
#         return search_word_result


# # 近傍検索　引数としてユーザーの会社情報を受け取る。検索範囲は一旦固定に。
# @router.post("/")
# def get_search_near(data: dict):
#     company = jsonable_encoder(data)
#     res = search_crud.get_search_near(company)
#     if res:
#         return res
#     raise HTTPException(status_code=404, detail="一致する結果が見つかりませんでした。キーワードを変えて再検索してください。")

# ２種類の検索の組み合わせ。
#  1.ログインユーザーで、位置情報を持っている → キーワード検索+距離検索APIへ。
#  2.未ログインで位置情報を持たない → キーワード検索APIへ。
@router.post("/")
def get_search(data:dict):
    seach_data = jsonable_encoder(data)
    if seach_data["info"]["location"]:
        logger.debug("位置情報アリ")
        res = search_crud.get_serch_both(seach_data)
    else:
        logger.debug("位置情報ナシ")
        key = seach_data["key"]
        res = search_crud.get_search_word(key)
    if res:
        return res
    raise HTTPException(status_code=404, detail="一致する結果が見つかりませんでした。キーワードを変えて再検索してください。")

# POSTのdata形式
# {
#   "key":"キーワード" ,      
#   "info": {
#            "location":[]
#           }
# }

