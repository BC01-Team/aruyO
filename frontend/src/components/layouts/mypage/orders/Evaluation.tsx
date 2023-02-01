import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@/components/elements/Button";


const EvaluationButton = ({ type }: any) => {
  const [value, setValue] = useState<string>("5");
  const router = useRouter();
  const id = router.query.id;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "borrower") {
      const orderId = (id as string).split("&")[0];
      const borrowerId = (id as string).split("&")[1];
      const data = {
        borrower: {
          _id: borrowerId,
          evaluation: value,
        },
      };
      axiosInstance
        .put(`/reserves/status/${orderId}`, data)
        .then((res) => router.push(`/mypage/orders/lend`));
    } else if (type === "lender") {
            const orderId = (id as string).split("&")[0];
            const lenderId = (id as string).split("&")[1];
            const data = {
              lender: {
                _id: lenderId,
                evaluation: value,
              },
            };
            axiosInstance
              .put(`/reserves/status/${orderId}`, data)
              .then((res) => router.push(`/mypage/orders/borrow`));
    }
  };

  //tailwind
  //`/mypage/orders/lend/evaluation/${orderId}&${borrowerId}`
  return (
    <>
      {/* <div className="flex flex-col w-auto h-auto mt-64 items-center"> */}
        <div className="flex justify-between h-12 w-64 rounded-none bg-transparent">
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
            className="h-12 w-12 text-lg bg-amber-400 text-black-700 border-solid border-black hover:bg-orange-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            4
          </button>
          <button
            type="button"
            onClick={(e) => setValue(e.target.value)}
            value="5"
            className="h-12 w-12 text-lg bg-amber-500 text-black-700 border-solid border-black hover:bg-orange-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            5
          </button>
        </div>

        <div className="mt-12 text-center">
          <Button onClick={handleSubmit}>送信</Button>
        </div>
      {/* </div> */}
    </>
  );
};

export default EvaluationButton;
