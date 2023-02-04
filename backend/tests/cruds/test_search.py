from deepdiff import DeepDiff 
from src.cruds.search import get_search_word
from src.cruds.search import get_serch_both
from ..search_results import *

# 確認したいこと
# 1.ログインしていない場合はキーワード検索のみ行われる　routerのテスト
# 2.ログインしているときには距離検索が入る　　routerのテスト
# 3.空欄での検索は全物品が返る　　crudのテスト
# 4.キーワードが一致しない時は０件で返る  crudのテスト
# 5.距離+キーワードの場合、キーワードの一致があっても遠方ならヒットしない  crudのテスト


# キーワード検索APIのテスト（未ログイン時の検索ロジック）
def test_get_search_word():
    # キーワードが一致しない時は０件で返る
    assert  get_search_word("test") == no_result
    # 空欄での検索は全物品が返る
    assert  DeepDiff(get_search_word(""),no_keyword, ignore_order=True)
    # info.name内を検索しているかテスト
    assert  get_search_word("冷蔵ストッカー") == name1
    assert  DeepDiff(get_search_word("冷蔵"),name2, ignore_order=True)
    # info.detail内を検索しているかテスト
    assert  get_search_word("電源") == detail
    # info.requirements内を検索しているかテスト
    assert  get_search_word("食品用") == requirements


# 距離+キーワード検索（ログイン時の検索ロジック）
def test_get_serch_both():
    # ユーザー位置を起点に約11km圏内のみ結果として返すため、起点を都内にすると結果0件になる
    # "key":""  キーワード検索のみの場合結果11件、都内起点では0件
    assert get_serch_both(data1) == no_result
    # "key":"冷蔵"  キーワード検索のみの場合結果2件、都内起点では0件
    assert get_serch_both(data2) == no_result





