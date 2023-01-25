import { ReactNode } from "react";

type Props = { children: ReactNode };

const ContentsLayout = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default ContentsLayout;