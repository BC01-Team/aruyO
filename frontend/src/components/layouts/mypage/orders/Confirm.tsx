import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";

type Props = {
  result: string;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  orderId: string | string[] | undefined;
};

const Confirm = ({ result, status, setStatus, orderId }: Props) => {
  const router = useRouter();

  const handleStatusChange = (e: any) => {
    e.preventDefault();
    if ((e.target.value === "予約確定")) {
        console.log("貸出中前pass");
       console.log(e.target.value);
    //読み込みしたQRとorderIdの一致確認
        const data = {
          status: "貸出中",
        };
        axiosInstance
          .put(`/reserves/status/${orderId}`, data)
          .then((res) => router.push(`/mypage/orders/lend`));
    } else if ((e.target.value === "貸出中")) {
      //読み込みしたQRとorderIdの一致確認
        console.log("返却完了前pass")
        const data = {
          status: "返却完了",
        };
        axiosInstance
          .put(`/reserves/status/${orderId}`, data)
          .then((res) =>
            router.push(`/mypage/orders/lend/evaluation/${orderId}`)
          );
    }
  };

  return status === "予約確定" ? (
    <div>
      <p>取引詳細</p>
          <p>予約No. {orderId}</p>
      <p>{result}</p>
      <p>取引を開始しますか</p>
      <button onClick={handleStatusChange} value={"予約確定"}>
        チェックイン
      </button>
    </div>
  ) : (
    <div>
      <p>取引詳細</p>
      <p>返却を完了しますか？</p>
      <button onClick={handleStatusChange} value={"貸出中"}>
        チェックアウト
      </button>
    </div>
  );
};

export default Confirm;