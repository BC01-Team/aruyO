import { GetServerSideProps } from "next";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";

const Search = ({ items }) => {
  console.log(items);

  return (
    <h1>詳細検索フォーム、全貸出可能アイテム表示</h1>
  );
};

// export const getServerSideProps: GetServerSideProps =async () => {
//   const res = await axiosInstance.get(`/reserves/63d07e7d8a55fa5d23511a80`);
//   const items = await res.data;

//   return {
//     props: { items }
//   }
// }

export default Search;