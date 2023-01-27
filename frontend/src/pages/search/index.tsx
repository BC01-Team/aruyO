import { GetServerSideProps } from "next";
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import Map from "@/components/elements/GoogleMap";
import SearchBox from "@/components/elements/SearchBox";



const Search = (props) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword);
  const [currentKeyword, setCurrentKeyword] = useState(router.query.keyword);
  const [results, setResults] = useState( props.results );

  const getResultData = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(keyword);

    await axiosInstance
      .get(`/search/?word=${keyword}`)
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
        setCurrentKeyword(keyword)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("results", results);

  return (
    <>
      <SearchBox setKeyword={setKeyword} getResultData={getResultData} />
      <h1>キーワード&nbsp;【&nbsp;{currentKeyword}&nbsp;】の検索結果</h1>
      <div class="flex">
        <Map results={results} />
        <div class="flex flex-col">
        {results &&
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
          })}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =async (context) => {
  const res = await axiosInstance.get(`/search/?word=${context.query.keyword}`);
  // 検索結果が空の時、ステータス404が返ってくるためここで落ちる。"204 No Content"もしくは"200 OK"で「検索結果は０件です」等に変更したらいいかも。
  const results = await res.data;

  return {
    props: {results }
  }
}

export default Search;
