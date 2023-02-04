import { useState, useEffect } from "react";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import { User } from "@/types/user";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { axiosInstance } from "@/lib/axiosInstance";

type User = {
  user: User;
};

const Mypage = ({}: User) => {
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // ログイン認証からuserId取得
  const user = useRecoilValue(userState);

  useEffect(() => {
    setHydrated(true);
    setLoading(true);
    if (!user) {
      return;
    }
    const userId = user.id;
    const fetchDate = async () => {
      const res = await (
        await axiosInstance.get(`/users/${userId}`, {
          withCredentials: true,
        })
      ).data;

      setUserInfo(res);
      setLoading(false);
    };
    fetchDate();
  }, []);

  if (!hydrated) return null;

  return (
    <ProtectRoute>
      <>
        {!loading && userInfo && (
          <>
            <div className="flex">
              <Sidebar />
              <MypageLayout>
                <PageTitle>マイページトップ</PageTitle>
                <ContentsLayout>
                  <div className="overflow-hidden bg-white shadow sm:rounded-md">
                    <ul role="list" className="divide-y divide-gray-200">
                      <li key="index">
                        <div className="flex user-center px-4 py-4 sm:px-6">
                          <div className="flex min-w-0 flex-1 user-center">
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="truncate text-sm font-medium text-amber-600">
                                  {userInfo.info.name}
                                </p>
                                <p className="mt-2 flex user-center text-sm text-gray-500">
                                  <span className="truncate">
                                    {userInfo.info.address}
                                  </span>
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <div>
                                  <p className="text-sm text-gray-900">
                                    表示させる項目は要検討
                                  </p>
                                  <a
                                    className="mt-2 flex user-center text-sm text-gray-500"
                                    href={userInfo.info.hp_url}
                                  >
                                    {userInfo.info.hp_url}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </ContentsLayout>
                <ContentsLayout>
                  <div className="overflow-hidden bg-white shadow sm:rounded-md">
                    <ul role="list" className="divide-y divide-gray-200">
                      <li key="index">
                        <div className="flex user-center px-4 py-4 sm:px-6">
                          <div className="flex min-w-0 flex-1 user-center">
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="truncate text-sm font-medium text-amber-600">
                                  {userInfo.staff[0].name}
                                </p>
                                <p>
                                  管理者 {userInfo.staff[0].role.admin} / 貸す{" "}
                                  {userInfo.staff[0].role.item} / 借りる{" "}
                                  {userInfo.staff[0].role.reservation}
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <div>
                                  <p className="text-sm text-gray-900">
                                    表示させる項目は要検討
                                  </p>
                                  <p className="mt-2 flex user-center text-sm text-gray-500">
                                    <span className="truncate">
                                      {userInfo.staff[0].email}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </ContentsLayout>
              </MypageLayout>
            </div>
          </>
        )}
        {loading && <div>ロード中</div>}
      </>
    </ProtectRoute>
  );
};

export default Mypage;
