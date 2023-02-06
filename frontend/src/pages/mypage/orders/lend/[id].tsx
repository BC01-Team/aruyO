import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import { classNames } from "@/lib/class-names";
import Confirm from "@/components/layouts/mypage/orders/Confirm";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import QrReader from "@/components/layouts/mypage/orders/QrReader";
import Loading from "@/components/elements/Loading";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../lib/atom";
import { Tab } from "@headlessui/react";
import { Order } from "@/types/order";

type OrderProps = {
  result: Order;
};

const MyPageOrderDetailLender = ({}: OrderProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>();
  const [result, setResult] = useState<string>("");
  const [status, setStatus] = useState<string>(""); //TODO 不要？

  const user = useRecoilValue(userState);

  const router = useRouter();
  const orderId = router.query.id;

  useEffect(() => {
    setHydrated(true);
    setLoading(true);
    if (orderId) {
      const fetchData = async () => {
        //予約詳細取得
        const reserveInfo = (
          await axiosInstance.get(`/reserves/${orderId}`, {
            withCredentials: true,
          })
        ).data;
        //相手先企業情報取得
        const borrowerId = reserveInfo.borrower._id;
        const borrowerInfo = (
          await axiosInstance.get(`/users/${borrowerId}`, {
            withCredentials: true,
          })
        ).data;
        const res = [reserveInfo, borrowerInfo];
        setOrder(res);
        setLoading(false);
        // setStatus(order[0].status);
      };
      fetchData();
    }
  }, [orderId]);

  if (!hydrated) return null;
  if (loading) return <Loading />;

  return (
    <ProtectRoute>
      <>
        {result ? (
          <Confirm
            result={result}
            status={order[0].status}
            setStatus={setStatus}
            orderId={orderId}
            borrowerId={order[0].borrower._id}
          />
        ) : (
          <>
            {!loading && order && user && order[0].lender._id === user.id && (
              <>
                <div className="flex">
                  <Sidebar />
                  <MypageLayout>
                    <ContentsLayout>
                      <PageTitle>貸出詳細</PageTitle>
                      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* 画像ギャラリー */}
                        <Tab.Group as="div" className="flex flex-col-reverse">
                          <div className="mx-auto mt-6 hidden w-full max-w-sm sm:block lg:max-w-none">
                            <Tab.List className="grid grid-cols-5 gap-6">
                              {order[0].items_copy?.pictures.map(
                                (picture, index) => (
                                  <Tab
                                    key={index}
                                    className="relative flex h-24 cursor-pointer items-center justify-center bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span className="absolute inset-0 overflow-hidden">
                                          <img
                                            src={picture}
                                            alt={
                                              order[0].items_copy?.info?.name
                                            }
                                            className="h-full w-full object-cover object-center"
                                          />
                                        </span>
                                        <span
                                          className={classNames(
                                            selected
                                              ? "ring-indigo-100"
                                              : "ring-transparent",
                                            "pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                                          )}
                                          aria-hidden="true"
                                        />
                                      </>
                                    )}
                                  </Tab>
                                )
                              )}
                            </Tab.List>
                          </div>

                          <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                            {order[0].items_copy?.pictures.map(
                              (picture, index) => (
                                <Tab.Panel key={index}>
                                  <img
                                    src={picture}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </Tab.Panel>
                              )
                            )}
                          </Tab.Panels>
                        </Tab.Group>

                        <div className="">
                          {/* 物品詳細 */}
                          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <div className="text-sm font-bold text-gray-900 mb-2">
                              予約番号
                            </div>
                            <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                              <div>{orderId}</div>
                            </div>

                            <div className="text-sm font-bold text-gray-900 my-2">
                              物品名
                            </div>
                            <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                              {order[0].items_copy?.name}
                            </div>

                            <div className="text-sm font-bold text-gray-900 my-2">
                              貸出企業
                            </div>
                            <div className="text-sm font-normal text-gray-900 mt-2 mb-1">
                              {order[1].info?.name}
                            </div>
                            <div className="text-sm font-normal text-gray-900 mb-7">
                              連絡先 {order[1].info?.phone}
                            </div>

                            <div className="text-sm font-bold text-gray-900 my-2">
                              貸出期間
                            </div>
                            <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                              <div>
                                {order[0].period?.start} ～{" "}
                                {order[0].period?.end}
                              </div>
                            </div>

                            <div className="text-sm font-bold text-gray-900 my-2">
                              金額
                            </div>
                            <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                              <div>
                                {Number(
                                  order[0].payment?.total
                                ).toLocaleString()}
                                円
                              </div>
                            </div>

                            <div className="text-sm font-bold text-gray-900 my-2">
                              ステータス
                            </div>
                            <div className="my-6">
                              <span className="text-sm text-gray-900 font-bold border border-black border-solid rounded px-4 py-2 mr-4">
                                {order[0].payment?.status}
                              </span>
                              <span className="text-sm text-gray-900 font-bold border border-black border-solid rounded px-4 py-2">
                                {order[0].status}
                              </span>
                            </div>
                          </div>

                          {/* チェックイン/チェックアウトのボタンでカメラ起動 */}
                          <div className="mt-12">
                            {order[0].status !== "予約確定" &&
                            order[0].status !== "貸出中" ? (
                              <></>
                            ) : (
                              <QrReader
                                result={result}
                                setResult={setResult}
                                status={order[0].status}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </ContentsLayout>
                  </MypageLayout>
                </div>
              </>
            )}
          </>
        )}
      </>
    </ProtectRoute>
  );
};

export default MyPageOrderDetailLender;
