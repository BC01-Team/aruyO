import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";

const MypageOrderDetail = () => {
  const router = useRouter();
  // const [order, setOrder] = useState();

  useEffect(() => {
    const itemId = router.query.id;

    axiosInstance
      .get(`/reserves/${itemId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <>
      <Sidebar />
      <MypageLayout>
        <PageTitle>{router.query.id}</PageTitle>
        {/* <PageTitle>{order._id}</PageTitle> */}
        <ContentsLayout>
          <p>取引詳細ページ</p>
        </ContentsLayout>
      </MypageLayout>
    </>
  );
};

export default MypageOrderDetail;