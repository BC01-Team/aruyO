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
                    <Button>借りるものをみる</Button>
                  </Link>
                </div>
                <div className="overflow-x-auto">
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
                            className="flex flex-1 md:grid md:grid-cols-4 md:gap-4 rounded border-none my-4 px-4 py-4 sm:px-6 max-w-6xl bg-slate-100 text-sm text-gray-900"
                          >
                            {/* カラム1 画像 */}
                            <div className="flex-shrink-0 h-20 w-20">
                              <img src={order?.items_copy.pictures[0]} alt="" />
                            </div>

                            {/* カラム2 物品名 */}
                            <div>
                              <div className="font-bold mb-2">物品名</div>
                              <div className="mb-2">
                                {order?.items_copy?.name}
                              </div>
                            </div>

                            {/* カラム3 貸出期間、金額 */}
                            <div>
                              <div className="font-bold mb-2">貸出期間</div>
                              <div className="mb-2">
                                <div>
                                  {order?.period?.start} ～ {order?.period?.end}
                                </div>
                              </div>
                              <div className="font-bold mb-2">金額</div>
                              <div className="mb-2">
                                {Number(order?.payment?.total).toLocaleString()}
                                円
                              </div>
                            </div>

                            {/* カラム4 ステータス */}
                            <div className="items-center  text-sm font-bold">
                              <span className="border border-black border-solid rounded px-4 py-2 my-2">
                                {order?.status}
                              </span>
                              <br/>
                              <span className="border border-black border-solid rounded px-4 py-2 my-2">
                                {order?.payment?.status}
                              </span>
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
