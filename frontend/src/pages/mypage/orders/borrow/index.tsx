import { useEffect, useState } from "react";
import { userState } from "../../../../lib/atom";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRecoilValue } from "recoil";
import { Order } from "@/types/order";
import Link from "next/link";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import Status from "@/components/layouts/mypage/item/Status";
import Loading from "@/components/elements/Loading";
import Button from "@/components/elements/Button";

type OrdersProps = {
  orders: Order[];
};

const MyPageOrdersBorrower = ({}: OrdersProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);
  const user = useRecoilValue(userState);

  useEffect(() => {
    setHydrated(true);
    setLoading(true);
    if (!user) {
      return;
    }
    const borrowerId = user.id;
    const fetchData = async () => {
      const res = await (
        await axiosInstance.get(`/users/${borrowerId}/borrow`, {
          withCredentials: true,
        })
      ).data;

      setLoading(false);
      setOrders(res);
      console.log(orders);
    };
    fetchData();
  }, []);

  if (!hydrated) return null;
  if (loading) return <Loading />;
  console.log(orders);

  return (
    <ProtectRoute>
      <>
        {!loading && orders && (
          <div className="flex">
            <Sidebar />
            <MypageLayout>
              <PageTitle>借りるもの {orders.length} 件</PageTitle>
              <ContentsLayout>
                <div className="my-8">
                  <Link href="/mypage/orders/lend">
                    <Button style="primary">貸すものをみる</Button>
                  </Link>
                </div>
                <div>
                  {orders.map((order, index: number) => {
                    return (
                      <div key={index}>
                        <Link
                          as={`/mypage/orders/borrow/${order._id}`}
                          href={{
                            pathname: `/mypage/orders/borrow/[id]`,
                            query: order._id,
                          }}
                        >
                          <div className="flex flex-col md:flex-row items-center p-2 sm:px-6">
                            <div className="flex flex-1 justify-between rounded border-none p-4 bg-slate-100 max-w-6xl min-w-full h-28 text-sm text-gray-900">
                              <div className="flex flex-row">
                                <img
                                  className="h-20 aspect-square object-center object-fill"
                                  src={order?.items_copy.pictures[0]}
                                  alt={order?.items_copy?.name}
                                />
                              </div>

                              <div className="min-w-0 flex-1 mx-2 md:grid md:grid-cols-2 md:gap-4">
                                <div>
                                  <div className="mb-2">
                                    {order?.items_copy?.name}
                                  </div>
                                  <div className="mb-2">
                                    貸出期間 {order?.period?.start} ～{" "}
                                    {order?.period?.end}
                                  </div>
                                  <div className="mb-2">
                                    金額{" "}
                                    {Number(
                                      order?.payment?.total
                                    ).toLocaleString()}
                                    円
                                  </div>
                                </div>

                                <div className="flex flex-row shrink-0 items-center">
                                  <Status>{order?.status}</Status>
                                  <Status>{order?.payment?.status}</Status>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </ContentsLayout>
            </MypageLayout>
          </div>
        )}
      </>
    </ProtectRoute>
  );
};

export default MyPageOrdersBorrower;
