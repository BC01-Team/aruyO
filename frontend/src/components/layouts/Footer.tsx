import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bottom-0 mt-10 md:h-20 bg-[#EBEBEB]">
      <div className="w-screen flex flex-col justify-center px-6 py-3 text-center text-xs">
        <p className="text-center leading-5">
          利用規約 | プライバシーポリシー | プライバシーステートメント |
          健全化に資する運用方針 | お問い合わせ | 運営会社 | サイトマップ |
          フリーワードで探す | 特定商取引法の表示
        </p>
        <p className="text-center leading-5">
          ※これは技術を身につけるために作成されたサンプルサイトです。使用している写真は
          <Link href="/specialThanks" className="hover:underline">
            各商品のメーカーサイト
          </Link>
          からお借りしています。
        </p>
        <p className="text-center leading-5">
          &copy; 2023 aruyO, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
