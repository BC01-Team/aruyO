const Footer = () => {
  return (
    <footer className="fixed bottom-0 md:h-20 bg-[#EBEBEB]">
      <div className="flex">
        <div className="flex-1 w-screen">
          <div className="flex flex-col justify-center p-6">
            <p className="text-center text-xs leading-5">
              利用規約 | プライバシーポリシー | プライバシーステートメント | 健全化に資する運用方針 | お問い合わせ | 運営会社 | サイトマップ | フリーワードで探す | 特定商取引法の表示
            </p>
            <p className="text-center text-sm leading-5">
              &copy; 2023 aruyO, Inc. All rights reserved.
           </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;