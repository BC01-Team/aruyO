import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import { Order } from "@/types/order";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";

const MypageOrderDetailBorrower = () => {
  const router = useRouter();
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const itemId = router.query.id;

    axiosInstance
      .get(`/reserves/${itemId}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <MypageLayout>
        <PageTitle>{order?.exhibits_copy?.name}</PageTitle>
        <ContentsLayout>
          <p>借りる取引詳細ページ</p>
        </ContentsLayout>
      </MypageLayout>
    </>
  );
};

export default MypageOrderDetailBorrower;