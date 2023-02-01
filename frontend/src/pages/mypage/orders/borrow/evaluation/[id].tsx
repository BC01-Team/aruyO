import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import EvaluationButton from "@/components/layouts/mypage/orders/Evaluation";
import PageTitle from "@/components/layouts/mypage/PageTitle";

const Evaluation = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col items-center">
          <PageTitle>取引評価</PageTitle>
          <div className="text-lg mt-5 font-semibold">
            <h1>貸した人を評価してください</h1>
          </div>
          <div className="mt-3">
            <EvaluationButton type={"lender"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Evaluation;
