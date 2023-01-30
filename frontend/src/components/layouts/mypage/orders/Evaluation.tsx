import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const EvaluationRadioButton = ({ type }: any) => {
  const [value, setValue] = useState<string>("5");
  const router = useRouter();
  const orderId = router.query.id;
  console.log(orderId);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    console.log(type);
    if (type === "borrower") {
      const data = {
        borrower: { evaluation: value },
      };
      axiosInstance.put(`/reserves/status/${orderId}`, data)
      .then((res) => router.push(`/mypage/orders/lend`));
    }
  };

  //tailwind
  //http://localhost:3000/mypage/orders/lend/evaluation/63d4a9aed1b46130cb3cf95b
  return (
    <>
      <div className="flex flex-col w-auto h-auto mt-64 items-center">
        <div className="flex justify-between h-12 w-64 border rounded-none bg-transparent">
          <button
            type="button"
            onClick={(e) => setValue(e.target.value)}
            value="1"
            className="h-12 w-12 text-lg bg-orange-200 text-black-700 border-solid border-black hover:bg-orange-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            1
          </button>
          <button
            type="button"
            onClick={(e) => setValue(e.target.value)}
            value="2"
            className="h-12 w-12 text-lg bg-yellow-300 text-black-700 border-solid border-black hover:bg-orange-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            2
          </button>
          <button
            type="button"
            onClick={(e) => setValue(e.target.value)}
            value="3"
            className="h-12 w-12 text-lg bg-yellow-400 text-black-700 border-solid border-black hover:bg-orange-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            3
          </button>
          <button
            type="button"
            onClick={(e) => setValue(e.target.value)}
            value="4"
            className="h-12 w-12 text-lg bg-yellow-500 text-black-700 border-solid border-black hover:bg-orange-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            4
          </button>
          <button
            type="button"
            onClick={(e) => setValue(e.target.value)}
            value="5"
            className="h-12 w-12 text-lg bg-yellow-600 text-black-700 border-solid border-black hover:bg-orange-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            5
          </button>
        </div>

        <div className="mt-12 text-center">
          <button onClick={handleSubmit}>送信</button>
        </div>
      </div>
    </>
  );
};

export default EvaluationRadioButton;
