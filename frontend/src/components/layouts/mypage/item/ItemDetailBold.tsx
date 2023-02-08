import { ReactNode } from "react";

type Props = { children: ReactNode };

const ItemDetailBold = ({ children }: Props) => {
  return (
    <>
      {/* 物品詳細の項目見出し */}
      <div className="my-2 text-sm font-bold text-gray-900">{children}</div>
    </>
  );
};

export default ItemDetailBold;
