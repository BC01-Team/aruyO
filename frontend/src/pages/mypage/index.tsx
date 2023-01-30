import { useState, useEffect } from "react";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import ProtectRoute from "@/components/layouts/ProtectRoute";

const Mypage = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <ProtectRoute>
      <>
        <Sidebar />
        <MypageLayout>
          <PageTitle>マイページトップ</PageTitle>
          <ContentsLayout>
            <p>ここに内容を表示</p>
          </ContentsLayout>
        </MypageLayout>
      </>
    </ProtectRoute>
  );
};

export default Mypage;