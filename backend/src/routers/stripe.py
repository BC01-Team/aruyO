from fastapi import APIRouter, Header, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from starlette.requests import Request
from pydantic import BaseModel
import os
import stripe
from dotenv import load_dotenv, find_dotenv
from src.db import db
from src.utils.logger.logger import setup_logger
from bson.objectid import ObjectId


collection_reservations = db.reservations
router = APIRouter(
    tags=["stripe"],  # FastAPI Swagger /docsの分類
)
logger = setup_logger(__name__)


load_dotenv(find_dotenv())
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


class Data(BaseModel):
    account: str
    item_name: str
    item_description: str
    item_image: str
    base_price: float
    quantity: float
    metadata: dict


# Stripeのチェックアウトセッションを作成する（支払い用URLの発行）
@router.post("/create-checkout-session")
def create_checkout_session(data: Data):
    domain_url = os.getenv("DOMAIN")
    base_price = int(data.base_price)
    quantity = int(data.quantity)

    try:
        checkout_session = stripe.checkout.Session.create(
            success_url=domain_url + "/payment/success",
            cancel_url=domain_url + "/search/items/" + data.metadata["item_id"],
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "jpy",
                    "unit_amount": base_price,
                    "product_data": {
                        "name": data.item_name,
                        "description": data.item_description,
                        "images": [data.item_image],
                    },
                },
                "quantity": quantity,
            }],
            mode="payment",
            metadata={
                "reservation_id": data.metadata["reservation_id"]
            },
            payment_intent_data={
                "application_fee_amount": compute_application_fee_amount(base_price, quantity),
                "transfer_data": {
                    "destination": data.account  # 売上を受け取るアカウント(貸主)の指定
                },
                "metadata": {
                    "reservation_id": data.metadata["reservation_id"]
                }
            }
        )
        return JSONResponse({"checkout_session_url": checkout_session["url"]})
    except Exception as e:
        raise HTTPException(403, str(e))


@router.post("/webhook/")
async def webhook_received(request: Request, stripe_signature: str = Header(None)):
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    data = await request.body()

    try:
        event = stripe.Webhook.construct_event(
            payload=data,
            sig_header=stripe_signature,
            secret=webhook_secret
        )
        event_metadata = event["data"]["object"]["metadata"]
    except Exception as e:
        return {"error": str(e)}

    event_type = event["type"]
    if event_type == "checkout.session.completed":
        logger.debug("checkout session completed")

        # Stripeのセッション作成時に送ったメタデータを使い、今回の予約番号の決済ステータスを更新
        data = jsonable_encoder(event_metadata)
        update_payment_status(data)

    return {"status": "支払い成功"}


# 運営側収益(手数料)の計算、一旦10%とする
def compute_application_fee_amount(base_price, quantity):
    return int(0.1 * base_price * quantity)


# 決済完了後、決済ステータスを未決済から決済完了に更新
def update_payment_status(data):
    id = data["reservation_id"]
    status = "決済完了"
    reserve = collection_reservations.find_one({"_id": ObjectId(id)})
    if reserve:
        collection_reservations.update_one(
            {"_id": ObjectId(id)}, {"$set": {"payment.status": status}}
        )
    return False
