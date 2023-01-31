import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axiosInstance";
import EvaluationRadioButton from "@/components/layouts/mypage/orders/Evaluation";


const Evaluation = () => {
  const router = useRouter();
  const orderId = router.query;
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <>
      <div>取引を評価</div>
      <div>借りた人を評価してください</div>
      <EvaluationRadioButton type={"borrower"}/>
    </>
  );
};

export default Evaluation;
