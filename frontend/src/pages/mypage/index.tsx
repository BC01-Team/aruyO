import { useState, useEffect } from "react";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import ProtectRoute from "@/components/layouts/ProtectRoute";
import Loading from "@/components/elements/Loading";
import { User } from "@/types/user";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { axiosInstance } from "@/lib/axiosInstance";
import Link from "next/link";
import Button from "@/components/elements/Button";

type UserProps = {
  user: User;
};

const Mypage = ({}: UserProps) => {
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
    const fetchData = async () => {
      const res = await (
        await axiosInstance.get(`/users/${userId}`, {
          withCredentials: true,
        })
      ).data;

      setUserInfo(res);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (!hydrated) return null;
  if (loading) return <Loading />;

  return (
    <ProtectRoute>
      <>
        {!loading && userInfo && (
          <div className="flex">
            <Sidebar />
            <MypageLayout>
              <ContentsLayout>
                <PageTitle>ユーザー情報</PageTitle>
                <div className="sm:hidden my-8">
                  <Link href="/mypage/orders/borrow">
                    <Button style="primary">借りるものをみる</Button>
                  </Link>
                </div>
                <div className="sm:hidden my-8">
                  <Link href="/mypage/orders/lend">
                    <Button style="primary">貸すものをみる</Button>
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <div className="flex items-center rounded border-none mt-4 mb-8 px-4 py-4 sm:px-6 max-w-6xl min-w-full bg-slate-100 text-sm text-gray-900">
                    <div className="flex-1 md:grid md:grid-cols-3 md:gap-4">
                      {/* 企業情報 */}
                      <div>
                        <div className="font-bold mb-2">会社名</div>
                        <div className="mb-4">{userInfo.info?.name}</div>
                      </div>
                      <div>
                        <div className="font-bold mb-2">住所</div>
                        <div className="mb-4">{userInfo.info?.address}</div>
                        <div className="font-bold mb-2">電話番号</div>
                        <div className="mb-4">{userInfo.info?.phone}</div>
                      </div>
                      <div>
                        <div className="font-bold mb-2">ホームページ</div>
                        <div className="mb-4">
                          <a href={userInfo.info?.hp_url}>
                            {userInfo.info?.hp_url}
                          </a>
                        </div>
                        <div className="font-bold mb-2">支払方法</div>
                        <div className="">クレジットカード</div>
                        {/* <div className="">{userInfo.info?.account}</div> */}
                      </div>
                    </div>
                  </div>

                  {/* 担当者情報 */}
                  {userInfo?.staff.map((staff, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center rounded border-none my-4 px-4 py-4 sm:px-6 max-w-6xl min-w-full bg-slate-100"
                      >
                        <div className="flex-1 md:grid md:grid-cols-3 md:gap-4">
                          <div className="font-bold mb-2">
                            担当者{index + 1}
                          </div>
                          <div>
                            <div className="mb-2">{staff.name}</div>
                            <div className="mb-2">{staff.email}</div>
                          </div>
                          <div>
                            <div className="mb-2">
                              ユーザー情報変更　
                              {staff.role.admin === "1" ? "◯" : "ー"}
                            </div>
                            <div className="mb-2">
                              貸すもの登録　　　
                              {staff.role.item === "1" ? "◯" : "ー"}
                            </div>
                            <div>
                              借りるもの予約　　
                              {staff.role.reservation === "1" ? "◯" : "ー"}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ContentsLayout>
            </MypageLayout>
          </div>
        )}
      </>
    </ProtectRoute>
  );
};

export default Mypage;
