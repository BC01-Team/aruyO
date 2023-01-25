from fastapi import APIRouter, HTTPException
from src.utils.logger.logger import setup_logger

import src.cruds.cruds_search as search_crud

logger = setup_logger(__name__)


router = APIRouter(
    prefix="/search",  # エンドポイントの頭のURL http://localhost:8080/exhibit
    tags=["search"],  # http://127.0.0.1/docsの分類
)


# API_No.9 検索語keyの部分一致一覧取得（info.フィールド3つのいずれかに含まれる）
@router.get("/")
def get_search_word(word: str):
    search_word_result = search_crud.get_search_word(key=word)
    if not search_word_result:  # listが空[]の場合
        raise HTTPException(
            status_code=404, detail="一致する結果が見つかりませんでした。キーワードを変えて再検索してください。"
        )
    logger.debug("検索router")
    return search_word_result
