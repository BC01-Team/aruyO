import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import { Order } from "@/types/order";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import QrGenerator from "@/components/layouts/QrGenerator";
import QrReader from "@/components/layouts/QrReader";
import Button from "@/components/elements/Button";
//componentで使用する際下記記載
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../../lib/atom";
import { GetServerSideProps } from "next";

type OrderProps = {
  result: Order;
};

const MypageOrderDetailBorrower = ({ result }: OrderProps) => {
  const router = useRouter();
  const [order, setOrder] = useState<any>();
  const [reserveStatus, setReserveStatus] = useState<string>();
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(false);

  const orderId = router.query.id;
  useEffect(() => {
    setLoading(true);
    if (orderId) {
      const fetchDate = async () => {
        //予約詳細取得
        const reserveInfo = await(
          await axiosInstance.get(`/reserves/${orderId}`, {
            withCredentials: true,
          })
        ).data;

        //相手先企業情報取得
        const lenderId = reserveInfo.lender._id;
        const lenderInfo = await(
          await axiosInstance.get(`/users/${lenderId}`, {
            withCredentials: true,
          })
        ).data;

        const res = [reserveInfo, lenderInfo];
        setOrder(res);
        setLoading(false);
      };

      fetchDate();
    }
  }, [orderId]);

  console.log("orderレンダリング", order);

  return (
    <>
      {!loading && order && user && order[0].borrower._id === user.id && (
        <>
          <Sidebar />
          <MypageLayout>
            <div>
              <PageTitle>予約詳細</PageTitle>
            </div>
            <ContentsLayout>
              {order[0].items_copy?.picture.map((imgUrl:string, index:number) => (
                <img
                  className="h-12 w-12 rounded-full"
                  src={imgUrl}
                  alt=""
                  key={index}
                />
              ))}
              <div>
                <h3>予約番号</h3>
                <p className="truncate text-sm font-medium text-amber-600">
                  {orderId}
                </p>
              </div>
              <div>
                <h3>貸出企業</h3>
                <p className="truncate text-sm font-medium text-amber-600">
                  {order[1].info?.name}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="truncate">
                    連絡先: {order[1].info?.phone}
                  </span>
                </p>
              </div>
              <div>
                <h3>物品名</h3>
                <p className="truncate text-sm font-medium text-amber-600">
                  {order[0].items_copy?.name}
                </p>
              </div>
              <div>
                <h3>そのほか</h3>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="truncate">
                    貸出日: {order[0].period?.start}
                  </span>
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="truncate">
                    返却日: {order[0].period?.end}
                  </span>
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="truncate">
                    金額: {order[0].payment?.total}
                  </span>
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="truncate">
                    支払: {order[0].payment?.status}
                  </span>
                </p>
              </div>
              <div>
                <h3>ステータス</h3>
              </div>
              <p className="truncate text-sm font-medium text-amber-600">
                {order[0].status}
              </p>
              {/*予約ステータスにより表示切替 2列　status渡す*/}
              { order[0].status !== "予約確定" && order[0].status !== "貸出中" ? (<></>):(
                    <QrGenerator
                      qrText={`予約番号：${order[0]._id}, 品名:${order[0].items_copy?.name}, 貸出日:${order[0].period?.start}, 返却日:${order[0].period.start}`}
                    />
                  )}
            </ContentsLayout>
          </MypageLayout>
        </>
      )}
      {loading && <div>ロード中</div>}
    </>
  );
};

export default MypageOrderDetailBorrower;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const itemId = context.query.orderId
//   const cookie = context.req?.headers.cookie;
//   console.log("context.query",context.query);
//   const res = await axiosInstance.get(`/reserves/${itemId}`, {
//     headers: {
//       cookie: cookie!,
//     },
//   });

//   const result = await res.data;
//   console.log(result);
//   return {
//     props: { result },
//   };
// };
