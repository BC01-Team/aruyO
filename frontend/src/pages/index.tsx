import Head from "next/head";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import Loading from "@/components/elements/Loading";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axiosInstance";

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);

  // export default function Home() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    setHydrated(true);
    setLoading(true);

    const fetchData = async () => {
      const items = await axiosInstance.get(`/items`).then((res) => res.data);
      setItems(items);
      setLoading(false);

      console.log(items);
      return items;
    };
    fetchData();
  }, []);

  if (!hydrated) return null;
  if (loading) return <Loading />;

  return (
      <>
        {!loading && items && (
          <>
            <Head>
              {/* メタディスクリプション要設定 */}
              <title>aruyO</title>
              <meta
                name="description"
                content="ご近所同士で備品や設備を貸し借り。地域にあるリソースを可視化するマッチングプラットフォーム。"
              />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
              <div className="flex-col mt-4 mx-10">
                <img
                  className="w-fit"
                  src="/img/topPage/topImage.jpg"
                  alt="aruyo.inc"
                />
              </div>
              <div className="relative mx-12">
                {/* 出品するボタン　TODO API未実装 */}
                <img
                  className="absolute top-0 right-0 w-1/6 sm:w-32 z-10"
                  src="/img/topPage/camera.png"
                />
                <div className="my-8">
                  <div className="mx-auto text-center">
                    {/* おすすめ商品のアンダーライン */}
                    <img
                      className="mx-auto -mb-6"
                      src="/img/topPage/underLine.png"
                    />
                    <div className=" text-gray-500 font-sans font-bold text-xs md:text-xl">
                      おすすめの商品
                    </div>
                  </div>
                </div>
                {/* items.map */}
                <div className="flex flex-wrap mx-4">
                  {items.map((item, index: number) => {
                    console.log(item);
                    return (
                      <div
                        key={index}
                        className="flex flex-col justify-start w-40 mx-3 my-3"
                      >
                        <div className="object-cover object-center aspect-w-1 aspect-h-1">
                          <img
                            src={item.info.pictures[0]}
                            alt={item.info.name}
                          />
                        </div>
                        <div className="text-ellipsis overflow-hidden text-sm font-normal h-10">
                          {item.info.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          </>
        )}
      </>
  );
}
