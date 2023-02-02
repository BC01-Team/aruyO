import sys
from src.utils.redis.redis import r

sys.path.append("../")
from fastapi import APIRouter, Cookie
from typing import Optional
from src.utils.logger.logger import setup_logger

router = APIRouter()
logger = setup_logger(__name__)

NONE_EXIST = 0


# リクエストの都度login状態を確認
def is_login(session_id: Optional[str] = Cookie(None)):
    # cookieからsession_id取り出す
    res = {"session_id": session_id}
    session_id = res["session_id"]
    if session_id is None:
        return False
    logger.debug(session_id)
    # session_idの期限切れCK
    if r.exists(session_id) == NONE_EXIST:
        return False
    return True
