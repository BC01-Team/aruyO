import { ReactNode } from "react";

type Props = { children: ReactNode };

const List = ({ children }: Props) => {
  return (
    <div className="flex flex-1 md:grid md:grid-cols-4 md:gap-4 rounded border-none my-4 px-4 py-4 sm:px-6 max-w-6xl bg-slate-100 text-sm text-gray-900">
      {/* カラム1 */}
      <div>
        <div className="font-bold mb-2">見出し</div>
        <div className="mb-2">{children}</div>
      </div>
      {/* カラム2 */}
      <div>
        <div className="font-bold mb-2">見出し</div>
        <div className="mb-2">{children}</div>
      </div>
      {/* カラム3 */}
      <div>
        <div className="font-bold mb-2">見出し</div>
        <div className="mb-2">{children}</div>
      </div>
      {/* カラム４ */}
      <div>
        <div className="font-bold mb-2">見出し</div>
        <div className="mb-2">{children}</div>
      </div>
    </div>
  );
};

export default List;
