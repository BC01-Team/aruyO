from db import db

# ユーザー
company = [
    {
        "info": {
            "name": "グリー株式会社",
            "Japan_Corporate_Number": "8010401055923",
            "address": "〒106-0032 東京都港区六本木6-11-1 六本木ヒルズゲートタワー",
            "hp_url": "https://corp.gree.net/jp/ja/corporate/summary/",
            "location": [35.658756, 139.731986],
            "phone": "0123456789",
            "email": "info@gree.com",
            "account": "stripe"
        },
        "items_id": ["63cd1b0420cfbda6799aaaaa"],
        "borrower_history": ["63cd1b0420cfbda6799wwwww"],
        "reservations_history": []
    },
    {
        "info": {
            "name": "株式会社メルカリ",
            "Japan_Corporate_Number": "6010701027558",
            "address": "〒106-6108 東京都港区六本木６丁目１０番１号",
            "hp_url": "https://www.google.com/",
            "location":[35.660205,139.729202],
            "phone": "0123456789",
            "email": "info@mercari.com",
            "account": "stripe"
        },
        "staff": [
            {
                "id": "1",
                "name": "門後David",
                "email": "david@mercari.com",
                "password": "$2b$12$/13tMLgoH.Qn3rYOAbXK6.nfTwN/PXNDKp.2HsUqVkRkZJuW3m/iS",
                "role": {"admin": "1", "item": "1", "reservation": "1"},
            }
        ],
        "items_id": ["63cd1b0420cfbda6799aaaaa"],
        "borrower_history": ["63cd1b0420cfbda6799wwwww"],
        "reservations_history": []
    },
    {
        "info": {
            "name": "株式会社カッシーナ・イクスシー",
            "Japan_Corporate_Number": "9010401088996",
            "address": "〒107-0062 東京都港区南青山2-13-10",
            "hp_url": "www.cassina-ixc.jp",
            "location":[35.6705225,139.7036485],
            "phone": "0123456789",
            "email": "info@cassina.com",
            "account": "stripe"
        },
        "items_id": ["63cd1b0420cfbda6799aaaaa"],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "㈱ビームス 本社（BEAMS）",
            "Japan_Corporate_Number": "6010401029425",
            "address": "〒150-0001 東京都渋谷区神宮前1-5-8 神宮前タワービルディング",
            "hp_url": "https://www.beams.co.jp",
            "location":[35.6706882,139.6891846],
            "phone": "0123456789",
            "email": "info@beams.com",
            "account": "stripe"
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    }
]

# 出品物
item = [
    {
        "info": {
            "name": "ホワイトボード",
            "picture": "https://sws/s3/picture1.jpeg",
            "detail": "使用後は書いたものを消してください",
            "requirements": "平日日中のみ",
            "take_out": "true",
            "price": "1000",
            "address": "〒106-6108 東京都港区六本木６丁目１０番１号",
        },
    "location":[35.660205,139.729202],
    "company_id": "63cd1b0420cfbda6799d59b1"
    },
    {
        "info": {
            "name": "裁断機",
            "picture": "https://sws/s3/picture2.jpeg",
            "detail": "A2まで裁断可能。",
            "requirements": "平日日中のみ",
            "take_out": "true",
            "price": "1000",
            "address": "〒150-0001 東京都渋谷区神宮前1-5-8 神宮前タワービルディング",
        },
    "location":[35.6706882,139.6891846],
    "company_id": "63d124217a5c4bfaed6fe402"
    },
    {
        "info": {
            "name": "送風機",
            "picture": "https://sws/s3/picture3.jpeg",
            "detail": "口径:200φ、電源:単相100ｖ、風量:17ｍ3/min(50Hz)、重量:9kg、羽枚数:5枚",
            "take_out": "true",
            "price": "2000",
            "address": "〒107-0062 東京都港区南青山2-13-10",
        },
    "location":[35.6705225,139.7036485],
    "company_id": "63d124217a5c4bfaed6fe401"
    }
]

# 予約
reservation = {
    "items_copy": {
        "_id": "63cd1b0420cfbda6799aaaaa",
        "name": "ホワイトボード",
        "picture": "https://sws/s3/picture1.jpeg",
        "detail": "使用後は書いたものを消してください",
        "requirements": "平日日中のみ",
        "take_out": "true",
        "price": "1000",
        "address": "〒106-6108 東京都港区六本木６丁目１０番１号"
    },
    "period": {"start": "2023/2/1", "end": "2023/2/5"},
    "payment": {"total": "5000", "method": "口座振込", "status": "決済完了"},
    "lender": {"_id": "63cd1b0420cfbda6799d59b1", "evaluation": "3"},
    "borrower": {"_id": "63cd1b0420cfbda679911111", "evaluation": "3"},
    "status": "予約確定"
}

# ステータス
status = {
    "payment": ["未決済", "決済完了"],
    "reservation": ["募集中", "予約承認待ち", "予約確定", "利用中", "掲載停止"]
}


# コレクションを作成(= db.の後ろがコレクション名)
collection_companies = db.companies
collection_items = db.items
collection_reservations = db.reservations
collection_statuses = db.statuses


# ドキュメント(値)を保存
collection_companies.insert_many(company)
collection_items.insert_many(item)
collection_reservations.insert_many([reservation])
collection_statuses.insert_many([status])


# ドキュメントをconsoleに表示
for data in collection_companies.find():
    print(data)

for data in collection_items.find():
    print(data)

for data in collection_reservations.find():
    print(data)

for data in collection_statuses.find():
    print(data)
