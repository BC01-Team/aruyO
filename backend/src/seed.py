from db import db

# ユーザー
company = [
    {
        "info": {
            "name": "石川食品株式会社",
            "Japan_Corporate_Number": "7040001016687",
            "address": "〒273-0005 千葉県船橋市本町２丁目７−１７",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.9857010496792,35.7042641618967]
            },
            "phone": "0474244598",
            "email": "info@ishikawafoods.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "staff": [
            {
                "id": "1",
                "name": "門後David",
                "email": "david@ishikawafoods.com",
                "password": "$2b$12$/13tMLgoH.Qn3rYOAbXK6.nfTwN/PXNDKp.2HsUqVkRkZJuW3m/iS",
                "role": {"admin": "1", "item": "1", "reservation": "1"}
            }
        ],
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "トーヨー自動車千葉株式会社",
            "Japan_Corporate_Number": "6040001008264",
            "address": "〒273-0001 千葉県船橋市市場５丁目８−６",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[140.00095309133255,35.705279884497706]
            },
            "phone": "0474241011",
            "email": "info@toyo.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "学校法人船橋大学 理工学部",
            "Japan_Corporate_Number": "5010005002382",
            "address": "〒274-0063 千葉県船橋市習志野台７丁目２４−１",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[140.0580833131494,35.724788157112144]
            },
            "phone": "0474496528",
            "email": "info@funa.ac.jp",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "船橋市役所 環境政策課 総務企画係",
            "Japan_Corporate_Number": "",
            "address": "〒273-8501 千葉県船橋市湊町２丁目１０−２５",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.98239654045085,35.694813559229566]
            },
            "phone": "0474863951",
            "email": "info@funabashi.or.jp",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "合同会社役立",
            "Japan_Corporate_Number": "2040003001106",
            "address": "〒273-0033 千葉県船橋市本郷町４２１−２",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.95494485738993,35.70802841662957]
            },
            "phone": "0473760333",
            "email": "info@yakudatsu.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "株式会社クボ 京葉工場",
            "Japan_Corporate_Number": "1010001137839",
            "address": "〒273-0018 千葉県船橋市栄町２丁目１６−１",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.972841231876,35.68530327868201]
            },
            "phone": "0474386111",
            "email": "info@kubo.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "IKEDA Tokyo-Bay",
            "Japan_Corporate_Number": "9700150101312",
            "address": "〒273-0012 千葉県船橋市浜町２丁目３−３０",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.99197526296646,35.68282564243181]
            },
            "phone": "0479394856",
            "email": "info@ikeda.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "ニッポン油脂株式会社 船橋工場",
            "Japan_Corporate_Number": "8010001034914",
            "address": "〒273-0015 千葉県船橋市日の出２丁目１７−１",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.97883459482185,35.69227521164447]
            },
            "phone": "0474861595",
            "email": "info@n.yushi.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "株式会社応用ロボット",
            "Japan_Corporate_Number": "4040001108140",
            "address": "〒273-0864 千葉県北本町１丁目１７−２５",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.983239876428,35.710569955398604]
            },
            "phone": "0479186978",
            "email": "info@robot.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "船橋駅前商店会",
            "Japan_Corporate_Number": "2010401057596",
            "address": "〒273-0005 千葉県船橋市本町４丁目４１−１９",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.98783014548982,35.70121077781693]
            },
            "phone": "0474237965",
            "email": "funabashi.shoutenkai@gmail.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "ケリー株式会社",
            "Japan_Corporate_Number": "8010401055923",
            "address": "〒106-0032 東京都港区六本木6-11-1 六本木ヒルズゲートタワー",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.731986,35.658756]
            },
            "phone": "0356985485",
            "email": "info@kerry.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "株式会社メルカード",
            "Japan_Corporate_Number": "6010701027558",
            "address": "〒106-6108 東京都港区六本木６丁目１０番１号",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.729202,35.660205]
            },
            "phone": "0303255485",
            "email": "info@mercard.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "株式会社カッシーナ",
            "Japan_Corporate_Number": "9010401088996",
            "address": "〒107-0062 東京都港区南青山2-13-10",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.7036485,35.6705225]
            },
            "phone": "0356980035",
            "email": "info@kassy.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
    {
        "info": {
            "name": "ビーンズ 本社",
            "Japan_Corporate_Number": "6010401029425",
            "address": "〒150-0001 東京都渋谷区神宮前1-5-8",
            "hp_url": "https://www.google.com/",
            "location": {
                "type":"Point",
                "coordinates":[139.6891846,35.6706882]
            },
            "phone": "0354900359",
            "email": "info@beans.com",
            "account": {
                "stripe_connected_id":"acct_1MWZMz2eYfpnkUc7",
                "bank_account":""
            }
        },
        "items_id": [],
        "borrower_history": [],
        "reservations_history": []
    },
]

# 出品物
item = [
    {
        "info": {
            "name": "ホワイトボード",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/white-board-front.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/white-board-back.jpg"
            ],
            "detail": "使用後は書いたものを消してください",
            "requirements": "平日日中のみ",
            "take_out": "true",
            "price": "1000",
            "address": "〒273-0005 千葉県船橋市本町２丁目７−１７"
        },
        "location": {"type":"Point","coordinates":[139.9857010496792,35.7042641618967]},
        "lender": {
        "company_id": "",
        "company_name": "石川食品株式会社",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "裁断機",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/裁断機.gif"
            ],
            "detail": "A2まで裁断可能。",
            "requirements": "平日日中のみ",
            "take_out": "true",
            "price": "100",
            "address": "〒273-8501 千葉県船橋市湊町２丁目１０−２５　環境政策課 総務企画係"
        },
        "location": {"type":"Point","coordinates":[139.98239654045085,35.694813559229566]},
        "lender": {
        "company_id": "",
        "company_name": "船橋市役所",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "送風機",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/buggufann.png",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/buggufann2.png"
            ],
            "detail": "口径:200φ、電源:単相100ｖ、風量:17ｍ3/min(50Hz)、重量:9kg、羽枚数:5枚",
            "requirements": "",
            "take_out": "true",
            "price": "500",
            "address": "〒273-0015 千葉県船橋市日の出２丁目１７−１"
        },
        "location": {"type":"Point","coordinates":[139.97883459482185,35.69227521164447]},
        "lender": {
        "company_id": "",
        "company_name": "ニッポン油脂株式会社 船橋工場",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "3Dプリンター",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/3Dprinter_front.png",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/3Dprinter_side.png",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/3Dprinter_specification.png"
            ],
            "detail": "口径:200φ、電源:単相100ｖ、風量:17ｍ3/min(50Hz)、重量:9kg、羽枚数:5枚",
            "requirements": "材料はご準備ください。",
            "take_out": "false",
            "price": "1000",
            "address": "〒273-0864 千葉県北本町１丁目１７−２５"
        },
        "location": {"type":"Point","coordinates":[139.983239876428,35.710569955398604]},
        "lender": {
        "company_id": "",
        "company_name": "株式会社応用ロボット",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "冷蔵ケーキ用ショーケース",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/cake_showcase.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/cake_showcase2.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/cake_showcase3.jpg"
            ],
            "detail": "外形寸法（mm） 幅(W)900/奥(D)650/高(H)1,225mm",
            "requirements": "屋内利用限定。食品用のため衛生面に注意して使用してください。",
            "take_out": "true",
            "price": "2000",
            "address": "〒273-0012 千葉県船橋市浜町２丁目３−３０"
        },
        "location": {"type":"Point","coordinates":[139.99197526296646,35.68282564243181]},
        "lender": {
        "company_id": "",
        "company_name": "IKEDA Tokyo-Bay",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "冷蔵ストッカー",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/showcase3F.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/showcase_3F_2.jpg"
            ],
            "detail": "外形寸法 幅73.9/奥行57.7/高88.7cm/容量146L",
            "requirements": "返却時は庫内を乾燥させてください。",
            "take_out": "true",
            "price": "1500",
            "address": "〒274-0063 千葉県船橋市習志野台７丁目２４−１"
        },
        "location": {"type":"Point","coordinates":[140.0580833131494,35.724788157112144]},
        "lender": {
        "company_id": "",
        "company_name": "学校法人船橋大学 理工学部",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "揚げ物用ホットケース1段",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/hot_case.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/hot_case2.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/hot_case3.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/hot_case4.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/hot_case.jpg"
            ],
            "detail": "使用中は熱くなりますので火傷に注意してください。",
            "requirements": "使用後は分解してキレイに洗浄してください。",
            "take_out": "true",
            "price": "1500",
            "address": "〒273-0005 千葉県船橋市本町４丁目４１−１９"
        },
        "location": {"type":"Point","coordinates":[139.98783014548982,35.70121077781693]},
        "lender": {
        "company_id": "",
        "company_name": "船橋駅前商店会",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "揚げ物用ホットケース2段",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/hot_case_2F.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/hot_case_2F_2.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/hot_case_2F_3.jpg"
            ],
            "detail": "使用中は熱くなりますので火傷に注意してください。",
            "requirements": "使用後は分解してキレイに洗浄してください。",
            "take_out": "true",
            "price": "1500",
            "address": "〒273-0005 千葉県船橋市本町４丁目４１−１９"
        },
        "location": {"type":"Point","coordinates":[139.98783014548982,35.70121077781693]},
        "lender": {
        "company_id": "",
        "company_name": "船橋駅前商店会",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "店舗用什器",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/store_jyuki.png",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/store_jyuki2.png"
            ],
            "detail": "使用中は熱くなりますので火傷に注意してください。",
            "requirements": "使用後は分解してキレイに洗浄してください。",
            "take_out": "true",
            "price": "1000",
            "address": "〒273-0033 千葉県船橋市本郷町４２１−２"
        },
        "location": {"type":"Point","coordinates":[139.95494485738993,35.70802841662957]},
        "lender": {
        "company_id": "",
        "company_name": "合同会社役立",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "草刈り機",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/kusakariki.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/kusakariki2.png"
            ],
            "detail": "",
            "requirements": "土日のみ貸出可能",
            "take_out": "true",
            "price": "1000",
            "address": "〒273-0018 千葉県船橋市栄町２丁目１６−１"
        },
        "location": {"type":"Point","coordinates":[139.972841231876,35.68530327868201]},
        "lender": {
        "company_id": "",
        "company_name": "株式会社クボ 京葉工場",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "洗車用脚立",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/car_kyatatsu.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/car_kyatatsu_2.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/car_kyatatsu_3.jpg"
            ],
            "detail": "",
            "requirements": "土日のみ貸出可能",
            "take_out": "true",
            "price": "1000",
            "address": "〒273-0018 千葉県船橋市栄町２丁目１６−１"
        },
        "location": {"type":"Point","coordinates":[140.00095309133255,35.705279884497706]},
        "lender": {
        "company_id": "",
        "company_name": "トーヨー自動車千葉株式会社",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "冷蔵ショーケース",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/cake_showcase2.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/cake_showcase.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/cake_showcase3.jpg"
            ],
            "detail": "",
            "requirements": "",
            "take_out": "true",
            "price": "1500",
            "address": "〒107-0062 東京都港区南青山2-13-10"
        },
        "location": {"type":"Point","coordinates":[139.7036485,35.6705225]},
        "lender": {
        "company_id": "",
        "company_name": "株式会社カッシーナ",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
    {
        "info": {
            "name": "大型冷蔵ストッカー",
            "pictures": [
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/showcase_3F_2.jpg",
                "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/showcase3F.jpg"
            ],
            "detail": "",
            "requirements": "",
            "take_out": "true",
            "price": "1000",
            "address": "〒106-0032 東京都港区六本木6-11-1 六本木ヒルズゲートタワー"
        },
        "location": {"type":"Point","coordinates":[139.731986,35.658756]},
        "lender": {
        "company_id": "",
        "company_name": "ケリー株式会社",
        "stripe_connected_id": "acct_1MWZMz2eYfpnkUc7"
        }
    },
]

# 予約
reservation = {
    "items_copy": {
        "id": "63d607e9f7e435916eb7ae51",
        "name": "ホワイトボード",
        "pictures": [
            "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/white-board-front.jpg",
            "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/white-board-back.jpg"
        ],
        "detail": "使用後は書いたものを消してください",
        "requirements": "平日日中のみ",
        "take_out": "true",
        "price": "1000",
        "address": "〒106-6108 東京都港区六本木６丁目１０番１号"
    },
    "period": {"start": "2023/2/1", "end": "2023/2/5"},
    "payment": {"total": "5000", "method": "口座振込", "status": "決済完了"},
    "lender": {"id": "63d9c4525d4c2596f1501c79", "evaluation": "3"},
    "borrower": {"id": "63d9c4525d4c2596f1501c7d", "evaluation": "3"},
    "status": "予約確定"
}

# ステータス
status = {
    "payment": ["未決済", "決済完了"],
    "reservation": ["募集中", "予約承認待ち", "予約確定", "貸出中", "掲載停止", "返却完了"]
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
