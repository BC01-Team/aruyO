import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import { Item } from "@/types/item";
//componentで使用する際下記記載
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { axiosInstance } from "@/lib/axiosInstance";

type ItemProps = {
  result: Item;
};

const MypageItemDetail = ({ result }: ItemProps) => {
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
    if (user) {
      const userId = user.id;
      const fetchDate = async () => {
        // 物品詳細取得
        const res = await (
          await axiosInstance.get(`/users/${userId}/items/${itemId}`, {
            withCredentials: true,
          })
        ).data;

        setItem(res);
        setLoading(false);
      };

      fetchDate();
    }
  }, [itemId]);

  if (!hydrated) return null;

  return (
    <ProtectRoute>
      <>
        {!loading && item && (
          <>
            <Sidebar />
            <MypageLayout>
              <PageTitle>ユーザー物品詳細</PageTitle>
              <ContentsLayout>
                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                  <ul role="list" className="divide-y divide-gray-200">
                    <li key="index">
                      <Link
                        as={`/mypage/items/${item._id}`}
                        href={{
                          pathname: `/mypage/items/[id]`,
                          query: item._id,
                        }}
                      >
                        <div className="flex items-center px-4 py-4 sm:px-6">
                          <div className="flex min-w-0 flex-1 items-center">
                            <div className="flex-shrink-0">
                              {item.info.pictures.map((picture, index) => {
                                return (
                                  <li key={index}>
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                      <div className="flex min-w-0 flex-1 items-center">
                                        <div className="flex-shrink-0">
                                          <img
                                            className="h-20 w-20"
                                            src={picture}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </div>
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="truncate text-sm font-medium text-amber-600">
                                  {item.info.name}
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <span className="truncate">
                                    {item.info.price}円
                                  </span>
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <div>
                                  <p className="text-sm text-gray-900">
                                    表示させる項目は要検討
                                  </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                    {item.info.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
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
