import enum
from pydantic import BaseModel, Field  # バリデーションチェック
from src.utils.logger.logger import setup_logger
from typing import Optional

# BaseModelはFastAPIのスキーマモデルであることを表す
# pydantic 名前:type宣言=値設定。Fieldの第一引数はデフォルト値, 省略（...）時は必須項目になる


# TODO _idだとrequirement=true(必須)にならないが、idだと必須になる。


class Items_Copy(BaseModel):
    _id: str = Field(..., max_length=24)
    name: str = Field(..., max_length=200)
    pictures: list[str]
    detail: str = Field(max_length=500)
    requirements: Optional[str] = Field(None, max_length=200)
    take_out: str
    # take_out: bool
    price: str
    # price: int = Field(0, ge=0, le=1000000)
    address: str = Field(..., max_length=200)


class Period(BaseModel):
    start: str
    end: str
    # start: datetime.date = Field(datetime.date.today())
    # end: datetime.date = Field(datetime.date.today())


class PaymentStatus(str, enum.Enum):
    status0: str = "未決済"
    status1: str = "決済完了"


class Payment(BaseModel):
    total: str
    # total: int = Field(0, ge=0, le=1000000)
    method: str = Field(..., max_length=50)
    status: PaymentStatus = Field(PaymentStatus.status0)


class Lender(BaseModel):
    id: str = Field(..., max_length=24)
    evaluation: str
    # evaluation: int = Field(0, ge=0, le=5)


class Borrower(BaseModel):
    id: str = Field(..., max_length=24)
    evaluation: str
    # evaluation: int = Field(0, ge=0, le=5)


class ReserveStatus(str, enum.Enum):
    status0: str = "募集中"
    status1: str = "予約承認待ち"
    status2: str = "予約確定"
    status3: str = "貸出中"
    status4: str = "掲載停止"
    status5: str = "返却完了"


class ReserveCreate(BaseModel):
    items_copy: Items_Copy
    period: Period
    payment: Payment
    lender: Lender
    borrower: Borrower
    status: ReserveStatus = Field(ReserveStatus.status2)  # TODO: 貸主企業側での承認機能が実装できたら、status1に変更


class Config:  # Configは Pydantic 用
    orm_mode = True
    # orm_mode=Trueとすることで、Item.id というアクセス可能。FastAPIの response_model に指定可能


class ReserveCreateResponse(ReserveCreate):
    _id: str = Field(..., max_length=24)

    class Config:
        schema_extra = {  # SwaggerのSuccessful Response
            "example": {
                "items_copy": {
                    "_id": "63d607e9f7e435916eb7ae51",
                    "name": "ホワイトボード",
                    "pictures": [
                        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/white-board-front.jpg",
                        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/white-board-back.jpg",
                    ],
                    "detail": "使用後は書いたものを消してください",
                    "requirements": "平日日中のみ受け付けています",
                    "take_out": "true",
                    "price": "1000",
                    "address": "〒106-6108 東京都港区六本木６丁目１０番１号",
                },
                "period": {"start": "2023/02/09", "end": "2023/02/15"},
                "payment": {"total": 7000, "method": "Stripe", "status": "未決済"},
                "lender": {"_id": " 63d9c4525d4c2596f1501c7a", "evaluation": ""},
                "borrower": {"_id": "63d9c4525d4c2596f1501c72", "evaluation": ""},
                "status": "予約確定",  # TODO: 貸主企業側での承認機能が実装できたら、予約承認待ちに変更
            }
        }


logger = setup_logger(__name__)
# logger.debug(ReserveCreateResponse.schema())
# NOTE スキーマ確認用。ファイル実行すればJSONでschemaを確認できる。
