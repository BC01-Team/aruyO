import Link from "next/link";
import PageTitle from "@/components/elements/PageTitle";
const SpecialThanks = () => {
  return (
    <>
      <PageTitle>Special Thanks</PageTitle>
      <div className="flex flex-col w-auto h-auto mt-3 items-center">
        <div className="text-lg mt-3 flex items-center font-semibold">
          <h1>
            サイトで使用している写真は以下のメーカー様のWebサイトからお借りしています
          </h1>
          <p>（名前押下でWebサイトへ遷移します）</p>
        </div>
        <ul className="mt-5 text-lg">
          <li className="mt-2 hover:underline">
            <Link href="http://www.kk-annaka.co.jp/products">
              株式会社アンナカ様
            </Link>
          </li>
          <li className="mt-2 hover:underline">
            <Link href="https://agriculture.kubota.co.jp/product">
              株式会社クボタ様
            </Link>
          </li>
          <li className="mt-2 hover:underline">
            <Link href="https://japan-tent.com">株式会社葵製作所様</Link>
          </li>
          <li className="mt-2 hover:underline">
            <Link href="https://jp.misumi-ec.com">株式会社ミスミ様</Link>
          </li>
          <li className="mt-2 hover:underline">
            <Link href="https://nichigaku.shop-pro.jp">日学株式会社様</Link>
          </li>
          <li className="mt-2 hover:underline">
            <Link href="https://www.hasegawa-kogyo.co.jp/product">
              長谷川工業株式会社様
            </Link>
          </li>
          <li className="mt-2 hover:underline">
            <Link href="https://www.hoshizaki.co.jp">ホシザキ株式会社様</Link>
          </li>
          <li className="mt-2 hover:underline">
            <Link href="https://www.nakatomi-sangyo.com">
              株式会社ナカトミ様
            </Link>
          </li>
          <li className="mt-2 hover:underline">
            <Link href="https://www.okamura.co.jp/product">
              株式会社オカムラ様
            </Link>
          </li>
          <li className="mt-2 hover:underline">
            <Link href="https://www.ricoh.co.jp/3dp/lineup">
              株式会社リコー様
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SpecialThanks;
