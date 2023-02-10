import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import Loading from "@/components/elements/Loading";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { axiosInstance } from "@/lib/axiosInstance";
import { Item } from "@/types/item";

const MyPageItems = () => {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(null);
  const user = useRecoilValue(userState);

  useEffect(() => {
    setHydrated(true);
    setLoading(true);
    if (!user) {
      return;
    }
    const userId = user.id;
    const fetchData = async () => {
      const res = await (
        await axiosInstance.get(`/users/${userId}/items`, {
          withCredentials: true,
        })
      ).data;

      setItems(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (!hydrated) return null;
  if (loading) return <Loading />;

  return (
    <ProtectRoute>
      <>
        {!loading && items && (
          <div className="flex h-full">
            <Sidebar />
            <MypageLayout>
              <PageTitle>登録物品 {items.length} 件</PageTitle>
              <ContentsLayout>
                <div>
                  <div role="list">
                    {items &&
                      items.map((item, index: number) => {
                        return (
                          <div key={index}>
                            <Link
                              as={`/mypage/items/${item._id}`}
                              href={{
                                pathname: `/mypage/items/[id]`,
                                query: item._id,
                              }}
                            >
                              <div className="flex flex-col md:flex-row items-center p-2 sm:px-6">
                                <div className="flex flex-1 justify-between rounded border-none p-4 bg-slate-100 max-w-6xl min-w-full h-28 text-sm text-gray-900">
                                  <div className="flex flex-row">
                                    <img
                                      className="h-20 w-20 aspect-square object-center object-fill"
                                      src={item.info?.pictures[0]}
                                      alt={item.info?.name}
                                    />
                                  </div>

                                  <div className="min-w-0 flex-1 mx-2">
                                    <div>
                                      <div className="mb-2">
                                        {item?.info?.name}
                                      </div>
                                      <div className="mb-2">
                                        金額{" "}
                                        {Number(
                                          item?.info?.price
                                        ).toLocaleString()}
                                        円/日
                                      </div>
                                      <div className="mb-2">
                                        {item?.info?.address}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
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

export default MyPageItems;
