import { ReactNode } from "react";

type Props = { children: ReactNode };

const ContentsLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      {children}
    </div>
  );
};

export default ContentsLayout;