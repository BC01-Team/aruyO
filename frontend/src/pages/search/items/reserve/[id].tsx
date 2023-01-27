import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { FieldValues, useForm } from 'react-hook-form';
import { Item } from "@/types/item";
import Button from "@/components/elements/Button";

const ReserveItem = () => {
  const router = useRouter();
  const [item, setItem] = useState<Item>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const itemId = router.query.id;

    axiosInstance
      .get(`/items/${itemId}`)
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getDays = () => {
    
  }

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const items_copy = item?.info;
    const { startDate, endDate } = data;
    const total = item?.info?.price;
    const lenderId = item?.company_id;
    const borrowerId = "63cd1b0420cfbda679911111" // ログイン情報から動的にIDを取得できるようになったら、要変更

    const orderData = {
      items_copy,
      period: {start: startDate, end: endDate},
      payment: {total: total, method: "Stripe", status: "未決済"},
      lender: {_id: lenderId, evaluation: ""},
      borrower: {_id: borrowerId, evaluation: ""},
      status: "予約承認待ち"
    };


    // 文字列から型を変更
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);

    // 料金計算　単価×日数
    console.log("日付", startDate, typeof startDate);
    console.log("変換", date1, typeof date1);

    let result = ( date2 - date1 ) / 86400000 + 1;
    console.log("結果", result);

    const totalAmount = item?.info?.price * result;
    console.log(totalAmount);

    await axiosInstance
      .post("/reserves", orderData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <div>
      <h1>予約画面</h1>
      <p>{item?.info?.name}</p>
      <p>{item?.info?.price}</p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="date" className="border-gray-300" {...register('startDate')} />
          <input type="date" className="border-gray-300" {...register('endDate')} />
          {/* <div className="flex items-center justify-center">
            <div className="datepicker relative form-floating mb-3 xl:w-96">
              <input type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Select a date"
                {...register('startDate')}
              />
              <label className="text-gray-700">受取日</label>
            </div>
            <div className="datepicker relative form-floating mb-3 xl:w-96">
              <input type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Select a date"
                {...register('endDate')}
              />
              <label className="text-gray-700">返却日</label>
            </div>
          </div> */}
          <Button type="submit">予約</Button>
        </form>
      </div>
    </div>
  );
};

export default ReserveItem;