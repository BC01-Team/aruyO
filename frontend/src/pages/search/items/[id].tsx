import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import { Item } from "@/types/item";

const ItemDetail = () => {
  const router = useRouter();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const itemId = router.query.id;
    console.log(itemId);

    axiosInstance
      .get(`/items/${itemId}`)
      .then((res) => {
        console.log(res);
        setItem(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>検索結果クリック後の物品詳細ページ</h1>
      <h1>{item?.info?.name}</h1>
      <h1>{item?.info?.address}</h1>  
    </div>
  );
};

export default ItemDetail;