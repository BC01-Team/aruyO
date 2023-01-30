import { GetServerSideProps } from "next";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { Order } from "@/types/order";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import Button from "@/components/elements/Button";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../../lib/atom";

type OrdersProps = {
  orders: Order[]
};

const MypageOrdersLender = ({}: OrdersProps) => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    setLoading(true);
    if (user) {
      const lenderId = user.id;
      const fetchDate = async () => {
        const res = await(
          await axiosInstance.get(`/users/${lenderId}/lent`, {
            withCredentials: true,
          })
        ).data;
        setLoading(false);
        setOrders(res);
      };
      fetchDate();
    }
  }, []);
    
    console.log(orders);
  return (
    <>
      {!loading && orders && (
      <div>
      <Sidebar />
      <MypageLayout>
        {/* 適当なタイトルに変更する */}
        <PageTitle>貸す取引一覧</PageTitle>
        <ContentsLayout>
          <div className="my-8">
            <Link href="/mypage/orders/borrow">
              <Button>借りる取引をみる</Button>
            </Link>
          </div>
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {orders.map((order, index: number) => {
                return (
                  <li key={index}>
                    <Link
                      as={`/mypage/orders/lend/${order._id}`}
                      href={{
                        pathname: `/mypage/orders/lend/[id]`,
                        query: order._id,
                      }}
                    >
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="flex min-w-0 flex-1 items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-full"
                              src={order?.items_copy.picture[0]}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="truncate text-sm font-medium text-amber-600">
                                {order?.items_copy?.name}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <span className="truncate">
                                  金額: {order?.payment?.total} 円
                                </span>
                              </p>
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
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  {order?.payment?.status}
                                </p>
                              </div>
                              <div>{order?.status}</div>
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
  );
};


export default MypageOrdersLender;