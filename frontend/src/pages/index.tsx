import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import Map from "@/components/elements/GoogleMap";
import SearchBox from "@/components/elements/SearchBox";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");
  const [results, setResults] = useState();

  // console.log(items);

  // 検索結果が0件だった時の処理方法、空で入力した場合は？
  // 表示後のresultsリセット？必要？

  const getResultData = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(keyword);

    // await axiosInstance
    //   .get(`/search/?word=${keyword}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setResults(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // 検索結果表示ページで検索するためにキーワードをqueryで渡してページ遷移する
    router.push({ pathname: "/search", query: { keyword: keyword } });
  };

  console.log("results", results);

  return (
    <>
      <Head>
        {/* メタディスクリプション要設定 */}
        <title>aruyO</title>
        <meta
          name="description"
          content="ご近所同士で備品や設備を貸し借り。地域にあるリソースを可視化するマッチングプラットフォーム。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* favicon要設定 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <div className="flex-col mt-4 mx-10">
            <img
              className="w-fit"
              src="/img/topPage/topImage.jpg"
              alt=""
            />
          </div>
          {/* <SearchBox setKeyword={setKeyword} getResultData={getResultData} /> */}
        </section>
        <section>
          <div className="relative mx-12">
            <img
              className="absolute top-0 right-0 w-1/6 sm:w-32"
              src="/img/topPage/camera.png"
            />
            <div className="my-8">
              <div className="mx-auto text-center">
                <img
                  className="mx-auto -mb-6"
                  src="/img/topPage/underLine.png"
                />
                <p className=" text-gray-500 font-sans font-bold text-xs md:text-xl">
                  おすすめの商品
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー1</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー2</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー3</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー4</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー5</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー6</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー7</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー8</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー9</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー10</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 動作確認用に以下のコードブロック使用中 */}
        {/* {results &&
          results.map((item) => {
            return (
              <Link
                key={item._id}
                as={`/search/items/${item._id}`}
                href={{ pathname: `/search/items/[id]`, query: item._id }}
              >
                <div>
                  <p>{item._id}</p>
                  <p>{item.info.name}</p>
                </div>
              </Link>
            );
          })} */}
        {/* ここまで */}
      </main>
    </>
  );
}

// 動作確認用　物品一覧取得
// export const getServerSideProps = async () => {
//   const res = await axiosInstance.get("/items");
//   const items = await res.data;

//   return {
//     props: { items }
//   }
// };
