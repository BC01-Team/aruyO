import { useState ,useEffect } from "react";
import Link from "next/link";
import Button from "../elements/Button";
import { useRecoilValue } from "recoil";
import { userState } from "../../lib/atom";

const Header = () => {
  const user = useRecoilValue(userState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <>
      <header className="sticky top-0 bg-amber-600 absolute z-50">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-amber-500 py-6 lg:border-none">
            <div className="flex items-center">
              <a href="/">
                <span className="text-3xl text-white">aruyo</span>
              </a>
            </div>
            <div className="ml-10 space-x-4">
              {/* ログイン時と未ログイン時でボタンの表示を切り替え */}
              {user ? (
                <div>
                  <Link href="/" className="mr-4">
                    <Button>借りる</Button>
                  </Link>
                  {/* ↓新規物品登録画面が作成できたらリンク先要変更 */}
                  <Link href="/" className="mr-4">
                    <Button>貸す</Button>
                  </Link>
                  <Link href="/mypage">
                    <Button>マイページ</Button>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link href="/signin" className="mr-4" >
                    <Button>ログイン</Button>
                  </Link>
                  <Link href="/signup">
                    <Button style="primary">会員登録</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;