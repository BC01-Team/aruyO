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

// userのみ使用する場合は、25行目
//  const [user, setUser] = useRecoilState(userState);
//  const user = useRecoilValue(userState);

// const order = {
//   _id: "63d4a9aed1b46130cb3cf95b",
//   items_copy: {
//     _id: "63cd1b0420cfbda6799aaaaa",
//     name: "ホワイトボード",
//     picture: "https://sws/s3/picture1.jpeg",
//     detail: "使用後は書いたものを消してください",
//     requirements: "平日日中のみ",
//     take_out: "true",
//     price: "1000",
//     address: "〒106-6108 東京都港区六本木６丁目１０番１号",
//   },
//   period: {
//     start: "2023/2/1",
//     end: "2023/2/5",
//   },
//   payment: {
//     total: "5000",
//     method: "口座振込",
//     status: "決済完了",
//   },
//   lender: {
//     _id: "63d4a9add1b46130cb3cf955",
//     evaluation: "3",
//   },
//   borrower: {
//     //true
//     _id: "63d4a9add1b46130cb3cf955",
//     evaluation: "3",
//   },
//   status: "予約確定",
// };
// 借りる側！borrower
type OrderProps = {
  result: Order;
};

const MypageOrderDetailBorrower = ({ result }: OrderProps) => {
  const router = useRouter();
  const [order, setOrder] = useState<any>();
  const [reserveStatus, setReserveStatus] = useState<string>();
  const user = useRecoilValue(userState);
  const orderId = router.query.id;
  const [loading, setLoading] = useState(false);
  // const []

  useEffect(() => {
    setLoading(true)
    if (orderId)
    {
      const fetchDate = async () => {
        //予約詳細取得
        const reserveInfo = await(
          await axiosInstance.get(`/reserves/${orderId}`, {
            withCredentials: true,
          })
        ).data;

        //相手先企業情報取得
        const lenderId = reserveInfo.lender._id
        const lenderInfo = await(
          await axiosInstance.get(`/users/${lenderId}`, {
            withCredentials: true,
          })
        ).data;
        const res = [reserveInfo,lenderInfo]
        console.log("res", res)
        
        setLoading(false);
        setOrder(res);

        //qrTextの生成

      }
      fetchDate();
      console.log("order",order);
    }
    },[])

  return (
    <>
      {!loading  && (
        <>
          <Sidebar />
          <MypageLayout>
            <PageTitle>予約詳細</PageTitle>
            <ContentsLayout>
              画像
              <img
                className="h-12 w-12 rounded-full"
                // src={order.items_copy?.picture}
                alt=""
              />
              <div>
                <PageTitle>予約情報</PageTitle>
              </div>
              {/*品名*/}
              {/* <p className="truncate text-sm font-medium text-amber-600">
            {order.items_copy?.name} */}
              {/*貸出先企業名*/}
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <span className="truncate">貸出先企業名: {"取得方法検討"}</span>
              </p>
              {/*貸出先担当者名*/}
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <span className="truncate">
                  貸出先担当者名: {"取得方法検討"}
                </span>
              </p>
              {/*貸出先連絡先*/}
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <span className="truncate">貸出先連絡先: {"取得方法検討"}</span>
              </p>
              {/*貸出日*/}
              <p className="mt-2 flex items-center text-sm text-gray-500">
                {/* <span className="truncate">貸出日: {order.period?.start}</span> */}
              </p>
              {/*返却日*/}
              <p className="mt-2 flex items-center text-sm text-gray-500">
                {/* <span className="truncate">返却日: {order.period?.end}</span> */}
              </p>
              {/*金額*/}
              <p className="mt-2 flex items-center text-sm text-gray-500">
                {/* <span className="truncate">金額: {order.payment?.total}</span> */}
              </p>
              {/*支払ステータス*/}
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <span className="truncate">
                  {/* 支払ステータス: {order.payment?.status} */}
                </span>
              </p>
              {/*予約ステータスにより表示切替 2列　status渡す*/}
              {/* <>{order?.status}</> */}
              {/* <QrGenerator qrText={order.items_copy?._id} /> */}
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