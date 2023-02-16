# aruyO
使用頻度が低いものを地域の企業/住民同士で貸し借りしあえるマッチングサービス

![0210_本番用バックアップ_AdobeExpress](https://user-images.githubusercontent.com/107560126/219248055-1d12724d-d03f-4c6d-a5c7-7f5b1bfaee28.gif)


![image](https://user-images.githubusercontent.com/107560126/219029888-8e5d1704-4ff0-4eac-97b1-40e4bf89183e.png)

## 機能
- セッション認証
- ログイン
- 検索機能（キーワード部分一致・距離）
- 検索結果地図表示
- 「借りる」予約登録
- 決済
- 「借りる」「貸す」取引の一覧と詳細の閲覧
- 登録物品詳細の閲覧
- 取引のチェックイン（QR生成）・チェックアウト（QR Reader）
- 取引相手の評価

## 使い方

1.リポジトリのクローン
```
$ git clone https://github.com/BC01-Team/aruyO.git
```

2.ルートディレクトリへ移動
```
$ cd auyO
```

3.dockerコマンドを入力
```
docker-compose run -w /usr/src/app --rm frontend npm install
```

```
$ docker-compose up
```

4.アプリにアクセスする
```
http://localhost:3000
```

![2023210 MsE Stage - aruyo (1)](https://user-images.githubusercontent.com/107560126/219031322-fedb9899-fa67-429c-bd01-c88ba9e8a80c.png)

- TypeScript: 4.9.4
- Node.js: 18.14.0
- NEXT.js: 13.1.4
- Tailwind CSS: 3.2.4
- Python: 3.9
- FastAPI:  0.89.1
- Pymongo: 4.3.3
- Stripe: 5.0.0
- Redis: 7.0
- MongoDB: 4.0
- Docker: 20.10.17
- AWS EC2, DocumentDB, ElastiCache(redis)


![2023210 MsE Stage - aruyo](https://user-images.githubusercontent.com/107560126/219030911-827628ee-f668-48b1-9320-6c3eb16ec96c.png)
