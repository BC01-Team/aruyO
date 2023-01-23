import redis
import os

HOST = os.environ.get("REDIS_URL")

# redis-serverとの接続　host:コンテナservice名
pool = redis.ConnectionPool(host=HOST, port=6379, db=0)
r = redis.StrictRedis(connection_pool=pool)

# 以下は接続ck用で削除可
# 'hogehoge' というキーで 'fugafuga' という値を追加します
r.set("hogehoge", "fugafuga", ex=5)


# 追加した値を取得して表示します
hogehoge = r.get('hogehoge')
print(hogehoge.decode())

# 追加した値を削除します
# result = r.delete('hoge')




