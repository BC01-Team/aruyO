import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import Button from "@/components/elements/Button";

type Props = {
  result: string;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  orderId: string;
  borrowerId: string;
};
//http://localhost:3000/mypage/orders/lend/${予約番号}
const Confirm = ({ result, status, setStatus, orderId, borrowerId }: Props) => {
  const router = useRouter();
  const [alert, setAlert] = useState<string>("");
  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const QrOrderId = result.split(",")[0].substring(5);

    //読み込みしたQRとorderIdの一致確認する
    if (orderId !== QrOrderId) {
      setAlert("予約番号が一致しません");
      return setTimeout(() => router.push("/mypage/orders/lend"), 1000);
    }

    if (status === "予約確定") {
      const data = {
        status: "貸出中",
      };
      axiosInstance
        .put(`/reserves/status/${orderId}`, data)
        .then((res) => router.push(`/mypage/orders/lend`));
    } else if (status === "貸出中") {
      const data = {
        status: "返却完了",
      };
      axiosInstance
        .put(`/reserves/status/${orderId}`, data)
        .then((res) =>
          router.push(`/mypage/orders/lend/evaluation/${orderId}&${borrowerId}`)
        );
    }
  };

  return status === "予約確定" ? (
    <div>
      <div className="bg-white">
        <div className="flex flex-col items-center">
          <PageTitle>取引詳細</PageTitle>
          <div className="border-t-4 w-6 py-2 border-black"></div>
          <div className="mt-6">
            <p>予約番号 : {orderId}</p>
            <p>{result}</p>
          </div>
          <div className="text-lg mt-5 font-semibold">
            <h1>{alert}</h1>
          </div>
          <div className="text-lg mt-5 font-semibold">
            <h1>取引を開始しますか</h1>
          </div>
          <div className="mt-4">
            <Button onClick={handleStatusChange}>チェックイン</Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white">
      <div className="flex flex-col items-center">
        <PageTitle>取引詳細</PageTitle>
        <div className="border-t-4 w-6 py-2 border-black"></div>
        <div className="mt-6">
          <p>予約番号 : {orderId}</p>
          <p>{result}</p>
        </div>
        <div className="text-lg mt-5 font-semibold">
          <h1>返却を完了しますか</h1>
        </div>
        <div className="mt-4">
          <Button onClick={handleStatusChange}>チェックアウト</Button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
