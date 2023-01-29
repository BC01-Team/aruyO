import axios from "axios";
import { useState, ChangeEvent } from "react";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";

// 認証周りができたら、動的にする。テスト用のため矛盾あり。
const user_id = "63d607e9f7e435916eb7ae4e";

export async function getServerSideProps() {
  const ENDPOINT = "http://localhost:8888/users/63d607e9f7e435916eb7ae4e";

  const data = await axios.get(ENDPOINT).then((res) => res.data);

  // 404や500を受け取ればレスポンスがあるので正常と判断しエラーは出ず .thenに進む。
  // const data = await fetch(ENDPOINT).then(res => res.json());
  console.log(data);

  return {
    props: { data },
  };
}

const user = [
  {
    info: {
      name: "株式会社メルカリ",
      Japan_Corporate_Number: "6010701027558",
      address: "〒106-6108 東京都港区六本木６丁目１０番１号",
      hp_url: "https://about.mercari.com/",
      location: [35.660205, 139.729202],
      phone: "0123456789",
      email: "info@mercari.com",
      account: "stripe",
    },
    staff: [
      {
        id: "1",
        name: "門後David",
        email: "david@mercari.com",
        password:
          "$2b$12$/13tMLgoH.Qn3rYOAbXK6.nfTwN/PXNDKp.2HsUqVkRkZJuW3m/iS",
        role: { admin: "1", item: "1", reservation: "1" },
      },
    ],
    items_id: ["63cd1b0420cfbda6799aaaaa"],
    borrower_history: ["63cd1b0420cfbda6799wwwww"],
    reservations_history: [],
  },
];

const Mypage = ({ data }) => {
  return (
    <>
      <Sidebar />
      <MypageLayout>
        <PageTitle>マイページトップ</PageTitle>
        <ContentsLayout>
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {user.map((user, index) => {
                return (
                  <li key={index}>
                    <div className="flex user-center px-4 py-4 sm:px-6">
                      <div className="flex min-w-0 flex-1 user-center">
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="truncate text-sm font-medium text-amber-600">
                              {user.info.name}
                            </p>
                            <p className="mt-2 flex user-center text-sm text-gray-500">
                              <span className="truncate">
                                {user.info.address}
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
                                href={user.info.hp_url}
                              >
                                {user.info.hp_url}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </ContentsLayout>
        <ContentsLayout>
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {user.map((user, index) => {
                return (
                  <li key={index}>
                    <div className="flex user-center px-4 py-4 sm:px-6">
                      <div className="flex min-w-0 flex-1 user-center">
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="truncate text-sm font-medium text-amber-600">
                              {user.staff[0].name}
                            </p>
                            <p className="mt-2 flex user-center text-sm text-gray-500">
                              <span className="truncate">
                                {user.staff[0].email}
                              </span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                表示させる項目は要検討
                              </p>
                              <p>管理者 {user.staff[0].role.admin}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </ContentsLayout>
      </MypageLayout>
    </>
  );
};

export default Mypage;
