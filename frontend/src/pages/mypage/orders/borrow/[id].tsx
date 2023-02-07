import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import { Order } from "@/types/order";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import QrGenerator from "@/components/layouts/mypage/orders/QrGenerator";
import Button from "@/components/elements/Button";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../lib/atom";
import ImageGallery from "@/components/elements/details/ImageGallery";
import Loading from "@/components/elements/Loading";
import Link from "next/link";
import ProtectRoute from "@/components/layouts/ProtectRoute";

type OrderProps = {
  result: Order;
};

const MyPageOrderDetailBorrower = ({ result }: OrderProps) => {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>();
  const [reserveStatus, setReserveStatus] = useState<string>(); // TODO 不要？

  const user = useRecoilValue(userState);

  const router = useRouter();
  const orderId = router.query.id;

  useEffect(() => {
    setHydrated(true);
    setLoading(true);
    if (orderId) {
      const fetchData = async () => {
        //予約詳細取得
        const reserveInfo = await (
          await axiosInstance.get(`/reserves/${orderId}`, {
            withCredentials: true,
          })
        ).data;

        //相手先企業情報取得
        const lenderId = reserveInfo.lender.id;
        const lenderInfo = await (
          await axiosInstance.get(`/users/${lenderId}`, {
            withCredentials: true,
          })
        ).data;

        const res = [reserveInfo, lenderInfo];
        setOrder(res);
        setLoading(false);
      };

      fetchData();
    }
  }, [orderId]);

  if (!hydrated) return null;
  if (loading) return <Loading />;

  return (
    <ProtectRoute>
      <>
        {!loading && order && user && order[0].borrower.id === user.id && (
          <div className="flex">
            <Sidebar />
            <MypageLayout>
              <ContentsLayout>
                <PageTitle>予約詳細</PageTitle>
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                  <ImageGallery alt={order[0].items_copy?.info?.name}>
                    {order[0].items_copy?.pictures}
                  </ImageGallery>

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
                          {order[0].period?.start} ～ {order[0].period?.end}
                        </div>
                      </div>

                      <div className="text-sm font-bold text-gray-900 my-2">
                        金額
                      </div>
                      <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                        <div>
                          {Number(order[0].payment?.total).toLocaleString()}円
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

                    {/*予約ステータスにより表示切替 2列　status渡す*/}
                    <div className="my-8">
                      {/* QRコード表示 */}
                      {order[0].status !== "予約確定" &&
                      order[0].status !== "貸出中" ? (
                        <></>
                      ) : (
                        <div className="">
                          <div className="text-sm font-bold text-gray-900 mb-2">
                            チェックイン/チェックアウト用QR
                          </div>
                          {/* TODO QRサイズ調整できていない、背景色要調整 */}
                          <div className="max-h-30">
                            <QrGenerator
                              qrText={`予約番号：${order[0]._id},
                                品名:${order[0].items_copy?.name},
                                貸出日:${order[0].period?.start},
                                返却日:${order[0].period?.end}`}
                            />
                          </div>
                        </div>
                      )}

                      {/* 評価ボタン表示 */}
                      {order[0]?.status === "返却完了" &&
                        !order[0]?.lender.evaluation && (
                          <>
                            <Link
                              href={{
                                pathname:
                                  "/mypage/orders/borrow/evaluation/[id]",
                                query: {
                                  id: `${orderId}&${order[0]?.lender.id}`,
                                },
                              }}
                            >
                              <Button>取引を評価</Button>
                            </Link>
                          </>
                        )}
                    </div>
                  </div>
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

export default MyPageOrderDetailBorrower;
