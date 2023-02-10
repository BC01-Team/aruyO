import Link from "next/link";

const Success = () => {
  return (
    <div className="mb-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
      <div className="mx-auto max-w-3xl flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-4">お支払いが完了しました</h1>
        <p>予約内容の詳細は<Link href="/mypage/orders/borrow" className="underline">マイページ</Link>からご確認ください</p>
      </div>
    </div>
  );
};

export default Success;