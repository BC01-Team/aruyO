import redis
import os

# redis-serverとの接続　host:コンテナservice名
HOST = os.environ.get("REDIS_URL")
pool = redis.ConnectionPool(host=HOST, port=6379, db=0)
r = redis.StrictRedis(connection_pool=pool)
