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

const MyPageOrdersLender = ({}: OrdersProps) => {
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
    const lenderId = user.id;
    const fetchData = async () => {
      const res = await (
        await axiosInstance.get(`/users/${lenderId}/lent`, {
          withCredentials: true,
        })
      ).data;
      setLoading(false);
      setOrders(res);
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
              <PageTitle>貸すもの {orders.length} 件</PageTitle>
              <ContentsLayout>
                <div className="my-8">
                  <Link href="/mypage/orders/borrow">
                    <Button style="primary">借りるものをみる</Button>
                  </Link>
                </div>
                <div>
                  {orders.map((order, index: number) => {
                    return (
                      <>
                        <Link
                          as={`/mypage/orders/lend/${order._id}`}
                          href={{
                            pathname: `/mypage/orders/lend/[id]`,
                            query: order._id,
                          }}
                        >
                          <div
                            key={index}
                            className="flex flex-1 flex-col md:flex-row justify-between items-center rounded border-none h-28 my-4 p-4 max-w-6xl bg-slate-100 text-sm text-gray-900"
                          >
                            {/* <div className="flex flex-row"> */}
                              <img
                                className="h-20 aspect-square object-center object-fill"
                                src={order?.items_copy.pictures[0]}
                                alt={order?.items_copy?.name}
                              />
                              <div className="mx-4">
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
                            {/* </div> */}

                            <div className="flex flex-row shrink-0 my-4">
                              <Status>{order?.status}</Status>
                              <Status>{order?.payment?.status}</Status>
                            </div>
                          </div>
                        </Link>
                      </>
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

export default MyPageOrdersLender;
