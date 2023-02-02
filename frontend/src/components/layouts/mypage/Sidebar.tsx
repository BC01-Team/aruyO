import Link from "next/link";
import LogoutButton from "../LogoutButton";

const navigation = [
  { name: "ユーザー情報", href: "/mypage", current: true },
  { name: "取引一覧", href: "/mypage/orders/lend", current: false },
  { name: "登録物品一覧", href: '/mypage/items', current: false }
];

const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};

const Sidebar = () => {
  const handleOnClick = (clickedItem: string) => {
    // ページ遷移時に"現在のページ"を変更
    navigation.forEach((item) => {
      if (item.current) {
        item.current = false;
      } else if (item.name === clickedItem) {
        item.current = true;
      }
    });
  };

  return (
    <div className="z-30  inset-y-0 flex w-64 flex-col ">
    {/* PC版固定サイドバー、SP版別途用意する必要あり */}
    {/* <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col"> */} 
      <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <nav className="mt-32 flex-1 space-y-1 bg-white px-2">
            {navigation.map((item) => (
              <div className="py-1" key={item.name}>
                <Link href={item.href}>
                  <button className={classNames(
                    item.current ?
                      "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                    )}
                    onClick={(e) => handleOnClick(item.name)}
                  >
                    {item.name}
                  </button>
                </Link>
              </div>
            ))}
          </nav>
          <div className="flex justify-center mb-28">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;