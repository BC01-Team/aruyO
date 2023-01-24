from db import db

# ユーザー
company = {
    "info": {
        "name": "株式会社メルカリ",
        "Japan_Corporate_Number": "6010701027558",
        "address": "〒106-6108 東京都港区六本木６丁目１０番１号",
        "hp_url": "https://www.google.com/",
        "latitude": "35.660205",
        "longitude": "139.729202",
        "phone": "0123456789",
        "email": "info@mercari.com",
        "account": "stripe",
    },
    "staff": [
        {
            "id": "1",
            "name": "門後David",
            "email": "david@mercari.com",
            "password": "####",
            "role": {"admin": "1", "exhibit": "1", "reservation": "1"},
        }
    ],
    "exhibits_id": ["63cd1b0420cfbda6799aaaaa"],
    "borrower_history": ["63cd1b0420cfbda6799wwwww"],
    "reservations_history": [],
}

# 出品物
exhibit = {
    "info": {
        "name": "ホワイトボード",
        "picture": "https://sws/s3/picture1.jpeg",
        "detail": "使用後は書いたものを消してください",
        "requirements": "平日日中のみ",
        "take_out": "true",
        "price": "1000",
        "address": "〒106-6108 東京都港区六本木６丁目１０番１号",
    },
    "latitude": "35.660205",
    "longitude": "139.729202",
    "company_id": "63cd1b0420cfbda6799d59b1",
}

# 予約
reservation = {
    "exhibits_copy": {
        "_id": "63cd1b0420cfbda6799aaaaa",
        "name": "ホワイトボード",
        "picture": "https://sws/s3/picture1.jpeg",
        "detail": "使用後は書いたものを消してください",
        "requirements": "平日日中のみ",
        "take_out": "true",
        "price": "1000",
        "address": "〒106-6108 東京都港区六本木６丁目１０番１号",
    },
    "period": {"start": "2023/2/1", "end": "2023/2/5"},
    "payment": {"total": "5000", "method": "stripe", "status": "決済完了"},
    "lender": {"_id": "63cd1b0420cfbda6799d59b1", "evaluation": "3"},
    "borrower": {"_id": "63cd1b0420cfbda679911111", "evaluation": "3"},
}

# ステータス
status = {
    "payment": ["未決済", "決済完了", "stripe"],
    "reservation": ["募集中", "予約承認待ち", "予約確定", "利用中", "掲載停止"]
}


# コレクションを作成(= db.の後ろがコレクション名)
collection_companies = db.companies
collection_exhibits = db.exhibits
collection_reservations = db.reservations
collection_statuses = db.statuses


# ドキュメント(値)を保存
collection_companies.insert_many([company])
collection_exhibits.insert_many([exhibit])
collection_reservations.insert_many([reservation])
collection_statuses.insert_many([status])


# ドキュメントをconsoleに表示
for data in collection_companies.find():
    print(data)

for data in collection_exhibits.find():
    print(data)

for data in collection_reservations.find():
    print(data)

for data in collection_statuses.find():
    print(data)
