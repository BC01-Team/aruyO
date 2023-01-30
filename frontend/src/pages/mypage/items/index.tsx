import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";
import ProtectRoute from "@/components/layouts/ProtectRoute";

const items = [
  {
    info: {
      name: "ホワイトボード",
      pictures: [
        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/white-board-front.jpg",
        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/white-board-back.jpg",
      ],
      detail: "使用後は書いたものを消してください",
      requirements: "平日日中のみ",
      take_out: "true",
      price: "1000",
      address: "〒106-6108 東京都港区六本木６丁目１０番１号",
    },
    location: [35.660205, 139.729202],
    company_id: "63cd1b0420cfbda6799d59b1",
  },
  {
    info: {
      name: "裁断機",
      pictures: [
        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/%E8%A3%81%E6%96%AD%E6%A9%9F.gif",
      ],
      detail: "A2まで裁断可能。",
      requirements: "平日日中のみ",
      take_out: "true",
      price: "1000",
      address: "〒150-0001 東京都渋谷区神宮前1-5-8 神宮前タワービルディング",
    },
    location: [35.6706882, 139.6891846],
    company_id: "63d124217a5c4bfaed6fe402",
  },
  {
    info: {
      name: "送風機",
      pictures: [
        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/%E5%A4%A7%E5%AD%A6_%E5%B7%A5%E4%BD%9C%E6%A9%9F%E6%A2%B0.png",
        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/%E5%A4%A7%E5%AD%A6_%E5%B7%A5%E4%BD%9C%E6%A9%9F%E6%A2%B0.png",
        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/%E7%99%BA%E9%9B%BB%E6%A9%9F.jpeg",
        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/3Dprinter_front.png",
        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/3Dprinter_side.png",
        "https://bc1-w2-haruko.s3.ap-northeast-1.amazonaws.com/3Dprinter_specification.png",
      ],
      detail:
        "口径:200φ、電源:単相100ｖ、風量:17ｍ3/min(50Hz)、重量:9kg、羽枚数:5枚",
      take_out: "true",
      price: "2000",
      address: "〒107-0062 東京都港区南青山2-13-10",
    },
    location: [35.6705225, 139.7036485],
    company_id: "63d124217a5c4bfaed6fe401",
  },
];

const MypageItems = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <ProtectRoute>
      <>
        <Sidebar />
        <MypageLayout>
          <PageTitle>登録物品一覧</PageTitle>
          <ContentsLayout>
            <div className="overflow-hidden bg-white shadow sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200">
                {items.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        as={`/mypage/items/${item._id}`}
                        href={{ pathname: `/mypage/items/[id]`, query: item._id }}
                      >
                        <div className="flex items-center px-4 py-4 sm:px-6">
                          <div className="flex min-w-0 flex-1 items-center">
                            <div className="flex-shrink-0">
                              <img
                              className="h-12 w-12 rounded-full"
                              src={item.info.pictures[0]}
                              alt=""
                            />
                            </div>
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="truncate text-sm font-medium text-amber-600">
                                {item.info.name}
                              </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <span className="truncate">
                                  {item.info.price}円
                                </span>
                                </p>
                              </div>
                              <div className="hidden md:block">
                                <div>
                                  <p className="text-sm text-gray-900">
                                  表示させる項目は要検討
                                </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                  {item.info.address}
                                </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ContentsLayout>
        </MypageLayout>
      </>
    </ProtectRoute>
  );
};

export default MypageItems;
