import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";

const Items = () => {
  return (
    <>
      <Sidebar />
      <MypageLayout>
        <PageTitle>登録物品一覧</PageTitle>
        <ContentsLayout>
          <p>ここに内容を表示</p>
        </ContentsLayout>
      </MypageLayout>
    </>
  );
};

export default Items;