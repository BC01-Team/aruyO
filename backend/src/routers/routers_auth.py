# import redis
import src.utils.redis.redis as r
import uuid
from fastapi import APIRouter, HTTPException, Response, status
import src.cruds.cruds_auth as auth_crud
import src.schemas.schemas_auth as auth_schema
from src.utils.logger.logger import setup_logger
from src.utils.redis.redis import r


logger = setup_logger(__name__)
router = APIRouter()


# login
@router.post("/login")
def create_sessoion(body: auth_schema.RequestBody, response: Response):
    email = body.email
    password = body.password
    logger.debug(email, password)

    # user認証
    user = auth_crud.authenticate_user(email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    # session_id発行
    session_id: str = str(uuid.uuid4())
    logger.debug("session_id", session_id)

    # redisにセッション保存 30日
    r.set(session_id, user["_id"], ex=30 * 24 * 60 * 60)
    logger.debug("r.get", r.get(session_id))

    # session_id set_cookie してuser情報をreturnする
    response.set_cookie(key="session_id", value=session_id)

    # localStorageに保存してもOKな項目だけを返す
    res_user = {
        "id": user["_id"],
        "name": user["info"]["name"],
        "location": user["info"]["location"],
        "staff_id": user["staff"][0]["id"],
        "staff_name": user["staff"][0]["name"],
    }
    logger.debug("res", res_user)

    return {"user": res_user}


# logout cookieに空文字挿入
@router.post("/logout")
async def save_cookie(response: Response):
    response.set_cookie(key="session_id", value="")
    return {"message": "logout ok"}
