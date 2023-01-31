import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import Button from "./Button";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, searchState } from "@/lib/atom";

type DataSet = {
  key: string | undefined;
  info: { location: {} };
};

const SearchBox = () => {
  const [keyword, setKeyword] = useState<string>();
  const user = useRecoilValue(userState);
  const router = useRouter();
  const [result, setResult] = useRecoilState(searchState);

  // 検索API呼び出し onClickでうごく
  const Search = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(keyword);
    // 検索APIに渡すdataSetの作成
    const dataSet: DataSet = {
      key: keyword,
      info: { location: {} },
    };

    // ユーザーのログイン情報を取得し、ログイン情報がある場合は位置情報をdataSetに追加する。
    if (user) {
      dataSet.info = {
        location: user.location,
      };
      console.log("location:", dataSet.info.location);
    }

    axiosInstance
      .post("/search", dataSet)
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
        router.push({ pathname: "/search", query: { keyword: keyword } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-10">
      <div className="mx-auto max-w-3xl flex justify-center">
        <label htmlFor="search" className="sr-only">
          検索
        </label>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm mr-2"
          placeholder="なにをお探しですか？"
          onChange={(e) => setKeyword(e.target.value)}
        />
        {/* 型エラー要修正 */}
        <Button onClick={Search}>検索</Button>
      </div>
    </form>
  );
};

export default SearchBox;
