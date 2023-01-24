
# オブジェクトの_idがBSONなのでstrに変換する
def db_collection_serializer(res) -> dict:
    if res:
        res["_id"] = str(res["_id"])
    return res
