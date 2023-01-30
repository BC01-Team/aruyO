import { ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import Loading from "../elements/Loading";

type Props = { children: ReactElement };

const ProtectRoute = ({ children }: Props) => {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!user) {
      if (typeof window !== "undefined") {
        router.push("/signin");
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading || !user) return <Loading />;

  return children;
};

export default ProtectRoute;