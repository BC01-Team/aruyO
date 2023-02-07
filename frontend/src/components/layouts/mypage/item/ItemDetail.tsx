import { ReactNode } from "react";

type Props = { children: ReactNode };

const ItemDetail = ({ children }: Props) => {
  return (
    <>
      {/* 物品詳細 */}
      <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 text-sm font-normal text-gray-900">
        <div className="mb-2">見出し</div>
        <div className="mt-2 mb-7">{children}</div>
      </div>
    </>
  );
};

export default ItemDetail;
