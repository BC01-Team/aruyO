import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import Map from "@/components/elements/GoogleMap";
import SearchBox from "@/components/elements/SearchBox";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";

const Search = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState(router.query.keyword);
  const [currentKeyword, setCurrentKeyword] = useState(router.query.keyword);
  const [results, setResults] = useState();

  // 検索APIに渡すdataSetの作成（初回時、２回目以降も共通処理）
  const user = useRecoilValue(userState);
  const dataSet = {
    key: keyword,
    info: { location: {} },
  };
  console.log("key:", dataSet.key);

  // ユーザーのログイン情報を取得し、ログイン情報がある場合は位置情報をdataSetに追加する。
  if (user) {
    dataSet.info = {
      location: user.location,
    };
    console.log("location:", dataSet.info.location);
  }

  // （初回の検索実行）トップページで検索ボタンを押したときに、キーワードを持ってきて、ここでAPI呼び出し
  useEffect(() => {
    axiosInstance
      .post("/search", dataSet)
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
        setCurrentKeyword(keyword);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // （結果ページからの再検索）　=>useEffectの設定で初回検索と２回目以降をまとめられないか？
  const getResultData = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(keyword);

    axiosInstance
      .post("/search", dataSet)
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
        setCurrentKeyword(keyword);
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

//componentで使用する際下記記載

// userのみ使用する場合は、25行目

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const dataSet = {};
//   dataSet.key = context.query.keyword;
//   dataSet.info.location = user.location;
//   console.log("key:", dataSet.key);
//   console.log("location:", dataSet.info.location);
//   const res = await axiosInstance.post(
//     `/search/?word=${context.query.keyword}`,
//     dataSet
//   );
//   // 検索結果が空の時、ステータス404が返ってくるためここで落ちる。"204 No Content"もしくは"200 OK"で「検索結果は０件です」等に変更したらいいかも。
//   const results = await res.data;

//   return {
//     props: { results },
//   };
// };

export default Search;
