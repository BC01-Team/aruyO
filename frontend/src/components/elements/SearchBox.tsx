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
  const [keyword, setKeyword] = useState<string>("");
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
    <form className="mx-auto ">
      <div className="flex justify-between relative ">
        <label htmlFor="search" className="sr-only">
          検索
        </label>
        <input
          type="text"
          name="search"
          id="search"
          className="w-80 h-10 rounded-full"
          placeholder="なにをお探しですか？"
          onChange={(e) => setKeyword(e.target.value)}
        />
        {/* 型エラー要修正 */}
        <button className="absolute right-0 top-0 mt-3 mr-4" onClick={Search}>
          {/* <Button style="primary"  */}
            <img src="/img/searchMark.png"/ >
          {/* </Button> */}
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
