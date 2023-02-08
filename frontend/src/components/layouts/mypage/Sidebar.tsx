import Link from "next/link";
import LogoutButton from "../LogoutButton";

const navigation = [
  { name: "ユーザー情報", href: "/mypage", current: true },
  {
    name: "取引一覧",
    children: [
      { name: "借りるもの", href: "/mypage/orders/borrow", current: false, },
      { name: "貸すもの", href: "/mypage/orders/lend", current: false, },
    ],
  },
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
      } else if (item.children) {
        // メニューがネストされている場合の処理
        item.children.map((child) => {
          if (child.current) {
            child.current =  false;
          } else if (child.name === clickedItem) {
            child.current = true;
          }
        });
      }
    });
  };

  return (
    
    <div className="hidden sm:z-30 sm:inset-y-0 sm:flex sm:w-64 sm:flex-col">
    {/* <div className="z-30 inset-y-0 flex w-64 flex-col"> */}
    {/* PC版固定サイドバー、SP版別途用意する必要あり。現状SPの場合はサイドバーを完全に非表示 */}
      <div className="flex min-h-0 flex-col border-r border-gray-200 bg-white">
        <div className="flex flex-col overflow-y-auto pb-4">
          <nav className="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
            {navigation.map((item) =>
              !item.children ? (
                <div className="py-1" key={item.name}>
                  <Link href={item.href}>
                    <button
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                      )}
                      onClick={(e) => handleOnClick(item.name)}
                    >
                      {item.name}
                    </button>
                  </Link>
                </div>
              ) : (
                <div key={item.name} className="space-y-1">
                  <div className="py-1" key={item.name}>
                    <div className="text-gray-600 group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full">
                      {item.name}
                    </div>
                  </div>
                  {item.children.map((subItem) => {
                    return (
                      <div className="py-1 ml-4" key={subItem.name}>
                        <Link href={subItem.href}>
                          <button
                            className={classNames(
                              subItem.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
                            )}
                            onClick={(e) => handleOnClick(subItem.name)}
                          >
                            {subItem.name}
                          </button>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )
            )}
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