from src.sample import is_prime

# test用サンプル　削除可です
def test_is_prime():
    assert not is_prime(1)
    assert is_prime(2)
    assert is_prime(3)
    assert not is_prime(4)
    assert is_prime(5)
    assert not is_prime(6)
    assert is_prime(7)
    assert not is_prime(8)
    assert not is_prime(9)
    assert not is_prime(10)


# from src.routers import routers_user_info


# def test_get_user_item():
#     result = routers_user_info.get_user_item(
#         "63d9c4525d4c2596f1501c7d", "63d607e9f7e435916eb7ae54", "session_id"
#     )
#     assert result == {
#         "_id": "63d607e9f7e435916eb7ae54",
#         "info": {
#             "name": "検索テスト　3Dプリンター",
#             "pictures": [
#                 "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/3Dprinter_front.png",
#                 "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/3Dprinter_side.png",
#                 "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/3Dprinter_specification.png",
#             ],
#             "detail": "材料はご準備ください。",
#             "take_out": "false",
#             "price": "2000",
#             "address": "〒107-0062 東京都港区南青山2-13-10",
#         },
#         "location": [35.724788157112144, 140.0580833131494],
#         "company_id": "63d9c4525d4c2596f1501c7d",
#     }
