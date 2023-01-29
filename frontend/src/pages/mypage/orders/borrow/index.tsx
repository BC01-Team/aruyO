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

// 認証周りができたら、動的にする。テスト用のため矛盾あり。
// const borrowerId = "63d4a9add1b46130cb3cf955";

const MypageOrderBorrower = () => {
  const [orders, setOrders] = useState(null)
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userState);
  
  useEffect(() => {
    setLoading(true);
    if (user) {
      const borrowerId = user.id
      const fetchDate = async () => {
        const res = await(
          await axiosInstance.get(`/users/${borrowerId}/borrow`, {
            withCredentials: true,
          })
        ).data;
        console.log("取得成功"),
        setLoading(false);
        setOrders(res);
      };
      fetchDate();
      console.log(orders);
    }
  }, []);

  console.log(orders);
  return (
    <>
      {!loading && orders && (
        <>
          <Sidebar />
          <MypageLayout>
            {/* 適当なタイトルに変更する */}
            <PageTitle>借りる取引一覧</PageTitle>
            <ContentsLayout>
              <div className="my-8">
                <Link href="/mypage/orders/lend">
                  <Button>貸す取引をみる</Button>
                </Link>
              </div>
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
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
                          <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="flex min-w-0 flex-1 items-center">
                              {/* <div className="flex-shrink-0">
                            <img className="h-12 w-12 rounded-full" src={item.info.picture} alt="" />
                          </div> */}
                              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                <div>
                                  <p className="truncate text-sm font-medium text-amber-600">
                                    {order?.items_copy?.name}
                                  </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                    {/* 借入？先企業名を表示できたほうがいい */}
                                    <span className="truncate">
                                      相手先: {order?.lender?._id}
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
        </>
      )}
      {loading && <div>ロード中</div>}
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const cookie = context.req?.headers.cookie;
//   console.log(cookie)
//   const res = await axiosInstance.get(`/users/${borrowerId}/borrow`, {
//     headers: {
//       cookie: cookie!
//     }
//   })
  
//   const orders = await res.data;

//   return {
//     props: { orders }
//   }
// };

export default MypageOrderBorrower;