import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { searchState } from "@/lib/atom";
import Map from "@/components/elements/GoogleMap";

const SearchResult = () => {
  const router = useRouter();
  const keyword = router.query.keyword;
  const result = useRecoilValue(searchState);
  
  return (
    <>
      <p className="text-center">
        <h1 className="mx-auto text-2xl my-10 font-sans font-bold">
          {keyword}の検索結果【{result.length}件】
        </h1>
      </p>
      <div className="flex justify-between mx-20 mb-30">
        <div className="grid md:grid-cols-4 md:gap-4 w-1/2">
          {result &&
            result.map((item) => {
              return (
                <Link
                  key={item._id}
                  as={`/search/items/${item._id}`}
                  href={{ pathname: `/search/items/[id]`, query: item._id }}
                >
                  <div>
                    <img src={item.info.pictures[0]} className="w-full"/>
                    <p>{item.info.name}</p>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="w-1/2 min-h-screen ml-20">
          <Map results={result} />
        </div>
      </div>
    </>
  );
};

export default SearchResult;
