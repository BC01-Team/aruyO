import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { Item } from "@/types/item";
import Button from "@/components/elements/Button";

const ReserveItem = () => {
  const router = useRouter();
  const [item, setItem] = useState<Item>();

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

  return (
    <div>
      <h1>予約画面</h1>
      <p>{item?.info?.name}</p>
      <p>{item?.info?.price}</p>
    </div>
  );
};

export default ReserveItem;