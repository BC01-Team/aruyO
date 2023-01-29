import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { Item } from "@/types/item";
import Button from "@/components/elements/Button";

const ItemDetail = () => {
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* 画像はダミーデータ、一旦一枚のみ表示 */}
          <img src="https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg" alt="" className="h-full w-full object-cover object-center" />

          {/* 物品情報 */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{item?.info?.name}</h1>

            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900">{Number(item?.info?.price).toLocaleString()} 円</p>
            </div>

            <div className="sm:flex-col1 mt-10 flex">
              <Link
                as={`/search/items/reserve/${item?._id}`}
                href={{ pathname: `/search/items/reserve/[id]`, query: item?._id }}
              >
                <Button>予約に進む</Button>
              </Link>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="text-xl my-2">
                詳細情報
              </h2>
              <div className="border-t py-2">
                <div className="mb-4">
                  <h3>詳細</h3>
                  <p>{item?.info?.detail}</p>
                </div>
                <div className="mb-4">
                  <h3>条件</h3>
                  <p>{item?.info?.requirements}</p>
                </div>
                <div className="mb-4">
                  <h3>持ち出し</h3>
                  <p>{item?.info?.take_out ? "可" : "不可"}</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="text-xl my-2">
                企業情報
              </h2>
              <div className="border-t py-2">
                <div className="mb-4">
                  <h3>企業名</h3>
                  <p>{item?.company_id}</p>
                </div>
                {/* <div className="mb-4">
                  <h3>条件</h3>
                  <p>{item?.info?.requirements}</p>
                </div>
                <div className="mb-4">
                  <h3>持ち出し</h3>
                  <p>{item?.info?.take_out ? "可" : "不可"}</p>
                </div> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
