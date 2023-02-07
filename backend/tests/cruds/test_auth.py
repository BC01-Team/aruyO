from src.cruds.auth import authenticate_user
from ..auth_results import *


def test_authenticate_user():
    assert authenticate_user("david@ishikawafoods.com", "password") == True
    assert authenticate_user("david@ishikawafoods.com", "passwordpassword") == False
    assert authenticate_user("david@ishikawafoods.co.jp", "password") == False
