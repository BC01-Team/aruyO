import { ReactNode } from "react";

type Props = { children: ReactNode };

const Status = ({ children }: Props) => {
  return (
    <div className="items-center text-sm font-bold shrink-0">
      <span className="border border-black border-solid rounded px-4 py-2 my-2 mr-4">
        {children}
      </span>
    </div>
  );
};

export default Status;
