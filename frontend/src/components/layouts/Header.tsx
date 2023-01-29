import Link from "next/link";
import Button from "../elements/Button";
import { useRecoilValue } from "recoil";
import { userState } from "../../lib/atom";


const Header = () => {
  const user = useRecoilValue(userState);
  console.log("Header",user)
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
              {/* 非ログイン時はログインボタンと会員登録ボタンを表示 */}
              {!user && (
                <>
                  <Link href="/signin">
                    <Button>ログイン</Button>
                  </Link>
                  <Link href="/signup">
                    <Button style="primary">会員登録</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;