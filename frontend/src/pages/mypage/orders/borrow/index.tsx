import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { Order } from "@/types/order";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import Button from "@/components/elements/Button";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../lib/atom";
import Loading from "@/components/elements/Loading";
import ProtectRoute from "@/components/layouts/ProtectRoute";

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
                <div className="overflow-hidden">
                  <ul role="list" className="">
                    {orders.map((order, index: number) => {
                      return (
                        <li key={index}>
                          <Link
                            as={`/mypage/orders/borrow/${order._id}`}
                            href={{
                              pathname: `/mypage/orders/borrow/[id]`,
                              query: order._id,
                            }}
                          >
                            <div className="flex flex-col md:flex-row items-center px-4 py-2 sm:px-6">
                              <div className="flex flex-1 item-center rounded border-none p-4 bg-slate-100 max-w-6xl min-w-full h-28">
                                <div className="flex-shrink-0">
                                  <img
                                    className="className=h-20 w-20"
                                    src={order?.items_copy.pictures[0]}
                                    alt={order?.items_copy?.name}
                                  />
                                </div>
                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
                                  <div>
                                    <p className="truncate text-sm font-medium text-amber-600">
                                      {order?.items_copy?.name}
                                    </p>
                                    <p className="truncate text-sm text-gray-900 mr-2">
                                      金額{" "}
                                      {Number(
                                        order?.payment?.total
                                      ).toLocaleString()}
                                      円
                                    </p>
                                    {/* <p className="mt-2 flex items-center text-sm text-gray-900">
                                    <span className="truncate">
                                      相手先: {order?.lender?.id}
                                    </span>
                                  </p> */}
                                  </div>
                                  <div className="hidden md:block">
                                    <div>
                                      <div className="flex">
                                        <p className="text-sm text-gray-900 mr-2">
                                          受取日: {order?.period?.start}
                                        </p>
                                        <p className="text-sm text-gray-900">
                                          返却日: {order?.period?.end}
                                        </p>
                                      </div>
                                      <p className="mt-2 flex items-center text-sm text-gray-900">
                                        {order?.payment?.status}
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-base text-gray-900">
                                    <span className="text-sm text-gray-900 font-bold border border-black border-solid rounded px-4 py-2">
                                      {order?.status}
                                    </span>
                                  </p>
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
        {/* {loading && <div>ロード中</div>} */}
      </>
    </ProtectRoute>
  );
};

export default MyPageOrdersBorrower;
