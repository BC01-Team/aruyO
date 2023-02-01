import { useState, useEffect } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userState } from "../../lib/atom";
import Button from "../elements/Button";
import SearchBox from "@/components/elements/SearchBox";

const Header = () => {
  const user = useRecoilValue(userState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;
  return (
    <>
      <header className="border-b border-gray-400 mb-16">
        <div className="container flex items-center md:h-20  p-5 flex-col md:flex-row">
          <div className="flex">
            <a href="/">
              <img className="h-9" src="/img/aruyoIcon.png" />
            </a>
          </div>
          <div className="mx-auto">
            {/* マイページでは検索窓を非表示にする */}
            <SearchBox />
          </div>
          <nav className="px-6 md:ml-auto lg:px-8" aria-label="Top">
            <div className="ml-10 space-x-4">
              {/* ログイン時と未ログイン時でボタンの表示を切り替え */}
              {user ? (
                <div>
                  <Link href="/" className="mr-4 font-sans text-sm">
                    借りる
                  </Link>
                  {/* ↓新規物品登録画面が作成できたらリンク先要変更 */}
                  <Link href="/" className="mr-4 font-sans text-sm">
                    貸す
                  </Link>
                  <Link href="/mypage" className="font-sans text-sm">
                    マイページ
                  </Link>
                </div>
              ) : (
                <div>
                  <Link href="/signin" className="mr-4 font-sans text-sm">
                    ログイン
                  </Link>
                  <Link href="/signup">
                    <Button style="primary">会員登録</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
