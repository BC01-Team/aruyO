import { ReactNode } from "react";

type Props = {
  children: Props
};

const PageTitle = ({ children }: any) => {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-4xl font-semibold text-gray-900 my-6 text-center">{children}</h1>
    </div>
  );
}

export default PageTitle;