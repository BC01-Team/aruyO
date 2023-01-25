import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";

// type Item = {
//   _id?: string;
//   info: {
//       name: string;
//       picture: string;
//       detail: string;
//       requirements: string;
//       take_out: string;
//       price: string;
//       address: string;
//   };
//   latitude: string;
//   longitude: string;
//   company_id: string;
// }

const MypageItemDetail = () => {
  const router = useRouter();
  // const [item, setItem] = useState<Item>();

  useEffect(() => {
    const itemId = router.query.id;

    axiosInstance
      .get("/")
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
        <ContentsLayout>
          <p>詳細ページ</p>
        </ContentsLayout>
      </MypageLayout>
    </>
  );
};

export default MypageItemDetail;