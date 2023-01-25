import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { axiosInstance } from '@/lib/axiosInstance';
import SearchBox from '@/components/elements/SearchBox';

export default function Home() {
  const [keyword, setKeyword] = useState<string>("");
  const [results, setResults] = useState();

  // 検索結果が0件だった時の処理方法

  const getResultData = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(keyword);

    await axiosInstance
      .get(`/search/?word=${keyword}`)
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("results", results);

  return (
    <>
      <Head>
        {/* メタディスクリプション要設定 */}
        <title>aruyO</title>
        <meta name="description" content="ご近所同士で備品や設備を貸し借り。地域にあるリソースを可視化するマッチングプラットフォーム。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* favicon要設定 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* デザインが来たら、随時修正 */}
        <SearchBox setKeyword={setKeyword} getResultData={getResultData} />
        {results && results.map((item) => {
          return (
            <Link
              as={`/search/items/${item._id}`}
              href={{ pathname: `/search/items/[id]`, query: item._id }}
            >
              <div key={item._id}>
                <p>{item._id}</p>
                <p>{item.info.name}</p>
              </div>
            </Link>
          );
        })}
      </main>
    </>
  );
};
