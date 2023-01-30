// 予約詳細ページに統合する
import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import QrGenerator from "@/components/layouts/QrGenerator";
import QrReader from "@/components/layouts/QrReader";
import Button from "@/components/elements/Button";


const mock_data = {
  _id: "63cd1b0420cfbda6799aaaaa",
  name: "ホワイトボード",
  period: { start: "2023/2/1", end: "2023/2/5" },
  status: "予約確定",
};




export const sample_qr: any = () => {
  // 読み込んだ QR コードのテキスト情報を格納
  const [result, setResult] = useState<string>("");
  
  const handleChangeStatus = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let putStatus: string = "";
    if (reserveStatus === "予約確定") {
      putStatus = "予約中";
    } else if (reserveStatus === "貸出中") {
      putStatus = "返却完了";
    }

    //認証不要
    //   await axiosInstance.post(/reserves/)
  };
  const reserveStatus = mock_data.status;
  console.log(reserveStatus);
  return (
    <>
      {reserveStatus !== "予約確定" && reserveStatus !== "貸出中" ? (
        <div>{reserveStatus}</div>
      ) : (
        <>
          <div>
            <QrGenerator qrText={qrText} />
          </div>

          <div>
            <QrReader
              result={result}
              setResult={setResult}
              status={reserveStatus}
            />
            <h1>
              {result}
            </h1>
            <h1>
              <Button onClick={handleChangeStatus}>
                更新
              </Button>
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default sample_qr;
