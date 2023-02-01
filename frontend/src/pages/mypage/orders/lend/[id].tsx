import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import { Order } from "@/types/order";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../../lib/atom";
import QrReader from "@/components/layouts/mypage/orders/QrReader";
import Confirm from "@/components/layouts/mypage/orders/Confirm";
import { Tab } from "@headlessui/react";
import { classNames } from "@/lib/class-names";
import Loading from "@/components/elements/Loading";

const MypageOrderDetailLender = () => {
  const router = useRouter();
  const [order, setOrder] = useState<any>();
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(false);
  const orderId = router.query.id;
  const [result, setResult] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    if (orderId) {
      const fetchDate = async () => {
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
      fetchDate();
    }
  }, [orderId]);

  if (loading) return <Loading />; 

  return (
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
              <Sidebar />
              <MypageLayout>
                <ContentsLayout>
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                      <PageTitle>取引詳細</PageTitle>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                      {/* 画像ギャラリー */}

                      <Tab.Group as="div" className="flex flex-col-reverse">
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                          <Tab.List className="grid grid-cols-4 gap-6">
                            {order[0].items_copy?.picture.map(
                              (picture, index) => (
                                <Tab
                                  key={index}
                                  className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                >
                                  {({ selected }) => (
                                    <>
                                      <span className="absolute inset-0 overflow-hidden rounded-md">
                                        <img
                                          src={picture}
                                          alt={order[0].items_copy?.info?.name}
                                          className="h-full w-full object-cover object-center"
                                        />
                                      </span>
                                      <span
                                        className={classNames(
                                          selected
                                            ? "ring-indigo-100"
                                            : "ring-transparent",
                                          "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
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
                          {order[0].items_copy?.picture.map(
                            (picture, index) => (
                              <Tab.Panel key={index}>
                                <img
                                  src={picture}
                                  className="h-full w-full object-cover object-center sm:rounded-lg"
                                />
                              </Tab.Panel>
                            )
                          )}
                        </Tab.Panels>
                      </Tab.Group>
                      <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {order[0].items_copy?.name}
                          </h1>

                          <section
                            aria-labelledby="details-heading"
                            className="mt-12"
                          >
                            {/* 取引No. */}
                            <h2 id="details-heading" className="text-xl my-2">
                              取引No.
                            </h2>
                            <div className="border-t py-2">
                              <div className="mb-4">
                                <h3>{orderId}</h3>
                              </div>
                            </div>

                            <h2 id="details-heading" className="text-xl my-2">
                              貸出企業
                            </h2>
                            <div className="border-t py-2">
                              <div className="mb-4">
                                <h3>{order[1].info?.name}</h3>
                                <h3>連絡先　{order[1].info?.phone}</h3>
                                <p></p>
                              </div>
                            </div>

                            <h2 id="details-heading" className="text-xl my-2">
                              貸出期間
                            </h2>
                            <div className="border-t py-2">
                              <div className="mb-4">
                                <h3>貸出日　{order[0].period?.start}</h3>
                                <h3>返却日　{order[0].period?.end}</h3>
                              </div>
                            </div>
                            {/* 
                              <h2 id="details-heading" className="text-xl my-2">
                                決済
                              </h2>
                              <div className="border-t py-2">
                                <div className="mb-4">
                                  <h3>金額　{Number(order[0].payment?.total).toLocaleString()}円</h3>
                                  <h3>ステータス　{order[0].payment?.status}</h3>
                                </div>
                              </div> */}
                          </section>
                          <div>
                            <h4 className="text-3xl">
                              <span className="border-black border-solid border-2 ">
                                {order[0].status}
                              </span>
                            </h4>
                          </div>
                          <div className="mt-6">
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
                    </div>
                  </div>
                </ContentsLayout>
              </MypageLayout>
            </>
          )}
          {/* {loading && <div>ロード中</div>} */}
        </>
      )}
    </>
  );
};

export default MypageOrderDetailLender;


