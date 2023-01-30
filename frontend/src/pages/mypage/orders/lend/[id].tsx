import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import { Order } from "@/types/order";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../../lib/atom"
import QrReader from "@/components/layouts/QrReader";
import Confirm from "@/components/layouts/mypage/orders/Confirm";

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
        const reserveInfo = await (
          await axiosInstance.get(`/reserves/${orderId}`, {
            withCredentials: true,
          })
        ).data;
        //相手先企業情報取得
        const borrowerId = reserveInfo.borrower._id;
        const borrowerInfo = await(
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

  // useEffect(() =>
  // {
  //   () => setStatus(order[0].status);
  // },[order])

  // console.log(status);

  return (
    <>
      {result ? (
        <Confirm
          result={result}
          status={order[0].status}
          setStatus={setStatus}
          orderId={orderId}
        />
      ) : (
        <>
          {!loading && order && user && order[0].lender._id === user.id && (
            <>
              <Sidebar />
              <MypageLayout>
                <PageTitle>{order?.items_copy?.name}</PageTitle>
                <ContentsLayout>
                  <PageTitle>取引詳細</PageTitle>
                  {order[0].items_copy?.picture.map(
                    (imgUrl: string, index: number) => (
                      <img
                        className="h-12 w-12 rounded-full"
                        src={imgUrl}
                        alt=""
                        key={index}
                      />
                    )
                  )}
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
                  {/*予約ステータスにより表示切替 2列status渡す*/}
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
                </ContentsLayout>
              </MypageLayout>
            </>
          )}
          {loading && <div>ロード中</div>}
        </>
      )}
    </>
  );
};

export default MypageOrderDetailLender;