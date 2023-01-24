import { useState } from "react";
import axios from "axios";
import Button from "./Button";

const SearchBox = () => {
  const [keyword, setKeyword] = useState<string>("");

  const getResultData = () => {
    // APIができたら処理を書く
    console.log(keyword);
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
          placeholder="発電機　藤沢市" // 要検討
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="submit" onClick={getResultData}>検索</Button>
      </div>
    </form>
  );
};

export default SearchBox;