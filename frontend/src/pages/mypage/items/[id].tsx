import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import ItemDetailBold from "@/components/layouts/mypage/item/ItemDetailBold";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import ImageGallery from "@/components/elements/details/ImageGallery";
import Loading from "@/components/elements/Loading";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { axiosInstance } from "@/lib/axiosInstance";

const MyPageItemDetail = () => {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);

  // ログイン認証からuserId取得
  const user = useRecoilValue(userState);
  // urlからitemIdを取得
  const router = useRouter();
  const itemId = router.query.id;

  useEffect(() => {
    setHydrated(true);
    setLoading(true);
    if (!user) {
      return;
    }
    const userId = user.id;
    const fetchData = async () => {
      // 物品詳細取得
      const res = await (
        await axiosInstance.get(`/users/${userId}/items/${itemId}`, {
          withCredentials: true,
        })
      ).data;

      setItem(res);
      setLoading(false);
    };
    fetchData();
  }, [itemId]);

  if (!hydrated) return null;
  if (loading) return <Loading />;

  return (
    <ProtectRoute>
      <>
        {!loading && item && (
          <div className="flex h-full">
            <Sidebar />
            <MypageLayout>
              <ContentsLayout>
                <PageTitle>登録物品詳細</PageTitle>
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                  <ImageGallery alt={item.info?.name}>
                    {item.info?.pictures}
                  </ImageGallery>

                  {/* 物品詳細 */}
                  <div className="text-sm font-normal text-gray-900 mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <ItemDetailBold>物品番号</ItemDetailBold>
                    <div className="mt-2 mb-7">
                      <div>{itemId}</div>
                    </div>
                    <ItemDetailBold>物品名</ItemDetailBold>
                    <div className="mt-2 mb-7">{item.info?.name}</div>
                    <ItemDetailBold>金額</ItemDetailBold>
                    <div className="mt-2 mb-7">
                      {Number(item.info?.price).toLocaleString()}
                      円/日
                    </div>
                    <ItemDetailBold>貸出場所</ItemDetailBold>
                    <div className="mt-2">{item.info?.address}</div>
                    <ItemDetailBold>詳細</ItemDetailBold>
                    <div className="mt-2 mb-7">{item.info?.detail}</div>
                    <ItemDetailBold>注意事項</ItemDetailBold>
                    <div className="mt-2 mb-7">{item.info?.requirements}</div>
                    <ItemDetailBold>持ち出し</ItemDetailBold>
                    <div className="mt-2 mb-7">
                      {item.info?.take_out === "true" ? "可" : "不可"}
                    </div>
                  </div>
                </div>
              </ContentsLayout>
            </MypageLayout>
          </div>
        )}
      </>
    </ProtectRoute>
  );
};

export default MyPageItemDetail;
