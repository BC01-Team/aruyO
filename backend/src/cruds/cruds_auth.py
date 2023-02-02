from src.utils.serializer.serializer import db_collection_serializer
from src.db import db
from passlib.context import CryptContext

# companyコレクション
collection = db.companies

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def get_user(email: str):
    find_user = {"staff": {"$elemMatch": {"email": email}}}
    print("find_user", find_user)
    user = collection.find_one(find_user)
    print("user", user)
    if not user:
        return False
    return db_collection_serializer(user)


def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        return False
    hashed_password = user["staff"][0]["password"]
    print("ck", hashed_password)
    if not verify_password(password, hashed_password):
        return False
    return user
