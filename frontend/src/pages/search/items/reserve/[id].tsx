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
      <div className="bg-amber-500">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input className="border" {...register('startDate')} />
          <input  className="border" {...register('endDate')} />
          <Button type="submit">予約</Button>
        </form>
      </div>
    </div>
  );
};

export default ReserveItem;