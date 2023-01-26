from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from src.utils.logger.logger import setup_logger
import src.cruds.cruds_search as search_crud

logger = setup_logger(__name__)


router = APIRouter(
    prefix="/search",  # エンドポイントの頭のURL
    tags=["search"],  # FastAPI Swagger /docsの分類
)


# API_No.9 検索語keyの部分一致一覧取得（info.フィールド3つのいずれかに含まれる）
@router.get("/")
def get_search_word(word: str): # Union型で検索語が空でも検索できるようにする
  if word == null:
      items_list = search_crud.get_items()
      if not items_list:  # listが空[]の場合
          raise HTTPException(status_code=404, detail="出品物がありませんでした。")
      logger.debug("出品物一覧router")
      return items_list

  else:
    search_word_result = search_crud.get_search_word(key=word)
    if not search_word_result:  # listが空[]の場合
        raise HTTPException(
            status_code=404, detail="一致する結果が見つかりませんでした。キーワードを変えて再検索してください。"
        )
    logger.debug("検索router")
    return search_word_result


# 近傍検索　引数としてユーザーの会社情報を受け取る。検索範囲は一旦固定に。
@router.post("/")
def get_search_near(data: dict):
    company = jsonable_encoder(data)
    res = search_crud.get_search_near(company)
    if res:
        return res
    raise HTTPException(status_code=404, detail="一致する結果が見つかりませんでした。キーワードを変えて再検索してください。")
