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
      <header className="z-50 border-b border-gray-400 mb-16">
        <div className="container flex items-center md:h-20  p-5 flex-col md:flex-row">
          <div className="flex lg:order-1">
            <a href="/">
              <img className="h-9" src="/img/aruyoIcon.png" />
            </a>
          </div>
          <nav
            className="flex justify-items-centermt-2 lg:ml-auto lg:px-8 lg:mt-0 lg:order-3"
            aria-label="Top"
          >
            <div className="ml-10 space-x-4">
              {/* ログイン時と未ログイン時でボタンの表示を切り替え */}
              {user ? (
                <div className="flex justify-between">
                  <Link href="/" className="mx-2 text-sm font-bold text-gray-900">
                    借りる
                  </Link>
                  {/* ↓新規物品登録画面が作成できたらリンク先要変更 */}
                  <Link href="/" className="mx-2 text-sm font-bold text-gray-900">
                    貸す
                  </Link>
                  <Link href="/mypage" className="mx-2 text-sm font-bold text-gray-900">
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
          <div className="mx-auto mt-2 lg:order-2 lg:mt-0">
            {/* マイページでは検索窓を非表示にする */}
            <SearchBox />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
