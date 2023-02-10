import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import EvaluationButton from "@/components/layouts/mypage/orders/Evaluation";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ProtectRoute from "@/components/layouts/ProtectRoute";

const Evaluation = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <ProtectRoute>
      <>
        <div className="bg-white h-full">
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
    </ProtectRoute>
  );
};

export default Evaluation;
