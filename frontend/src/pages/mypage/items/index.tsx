import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import { Items } from "@/types/item";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { axiosInstance } from "@/lib/axiosInstance";

const MypageItems = () => {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  // ログイン認証からuserId取得
  const user = useRecoilValue(userState);

  useEffect(() => {
    setHydrated(true);
    setLoading(true);
    if (user) {
      const userId = user.id;
      const fetchDate = async () => {
        const res = await (
          await axiosInstance.get(`/users/${userId}/items`, {
            withCredentials: true,
          })
        ).data;

        setItems(res);
        setLoading(false);
      };
      fetchDate();
    }
  }, []);

  if (!hydrated) return null;

  return (
    <ProtectRoute>
      <>
        {!loading && items && (
          <div className="flex">
            <Sidebar />
            <MypageLayout>
              <div className="font-bold text-2xl text-center mb-6">登録物品一覧</div>
              <ContentsLayout>
                <div className="overflow-hidden">
                  <ul role="list" className="">
                    {items.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link
                            as={`/mypage/items/${item._id}`}
                            href={{
                              pathname: `/mypage/items/[id]`,
                              query: item._id,
                            }}
                          >
                            <div className="flex flex-col md:flex-row items-center px-4 py-2 sm:px-6">
                              <div className="flex flex-1 item-center rounded border-none p-4 bg-slate-100 max-w-6xl min-w-full h-28">
                                <div className="flex-shrink-0">
                                  <img
                                    className="h-20 w-20"
                                    src={item.info.pictures[0]}
                                    alt=""
                                  />
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
                      );
                    })}
                  </ul>
                </div>
              </ContentsLayout>
            </MypageLayout>
          </div>
        )}
        {loading && <div>ロード中</div>}
      </>
    </ProtectRoute>
  );
};

export default MypageItems;
