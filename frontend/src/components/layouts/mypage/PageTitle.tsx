import { ReactNode } from "react";

type Props = { children: ReactNode };

const PageTitle = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-2xl font-semibold text-gray-900 my-6">{children}</h1>
    </div>
  );
};

export default PageTitle;