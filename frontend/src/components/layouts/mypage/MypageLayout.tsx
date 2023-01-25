import { ReactNode } from "react";

type Props = { children: ReactNode };

const MypageLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-1 flex-col md:pl-64">
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MypageLayout;