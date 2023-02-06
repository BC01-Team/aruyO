import { ReactNode } from "react";

type Props = { children: ReactNode };

const PageTitle = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="text-gray-900 font-bold text-2xl text-center mb-8">
        {children}
      </div>
    </div>
  );
};

export default PageTitle;