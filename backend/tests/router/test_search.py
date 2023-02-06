from deepdiff import DeepDiff 
from src.routers.search import get_search
from ..search_results import *

# 確認したいこと
# 1.ログインしていない場合はキーワード検索のみ行われる　routerのテスト
# 2.ログインしているときには距離検索が入る　　routerのテスト
# 3.空欄での検索は全物品が返る　　crudのテスト
# 4.キーワードが一致しない時は０件で返る  crudのテスト
# 5.距離+キーワードの場合、キーワードの一致があっても遠方ならヒットしない  crudのテスト


def test_get_search():
    # 位置データあり　->　get_serch_both へルーティング
    assert get_search(data1) == no_result
    assert get_search(data2) == no_result
    # 位置データなし　->　get_serch_word へルーティング
    assert DeepDiff(get_search(data3),no_keyword, ignore_order=True)
    assert DeepDiff(get_search(data4),name2, ignore_order=True)
    