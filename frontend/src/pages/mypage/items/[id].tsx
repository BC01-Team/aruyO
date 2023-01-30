import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import { Order } from "@/types/order";
//componentで使用する際下記記載
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { axiosInstance } from "@/lib/axiosInstance";

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

const itemId = "63d607e9f7e435916eb7ae51";

const MypageItemDetail = ({ result }: OrderProps) => {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    setHydrated(true);
    setLoading(true);
    if (user) {
      const userId = user.id;
      const fetchDate = async () => {
        // 物品詳細取得
        const res = await (
          await axiosInstance.get(`/users/${userId}/items/${itemId}`, {
            withCredentials: true,
          })
        ).data;

        setItems(res);
        setLoading(false);
      };

      fetchDate();
    }
  }, [itemId]);

  if (!hydrated) return null;

  return (
    <ProtectRoute>
      <>
        {!loading && items && (
          <>
            <Sidebar />
            <MypageLayout>
              <PageTitle>{router.query.id}</PageTitle>
              <ContentsLayout>
                <p>詳細ページ</p>
              </ContentsLayout>
            </MypageLayout>
          </>
        )}
        {loading && <div>ロード中</div>}
      </>
    </ProtectRoute>
  );
};

export default MypageItemDetail;
