import Link from "next/link";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";

const items = [
  {
    _id: '63d07e7d8a55fa5d23511a7f',
    // id: "1",
    info: {
        name: 'ホワイトボード',
        picture: 'https://sws/s3/picture1.jpeg',
        detail: '使用後は書いたものを消してください',
        requirements: '平日日中のみ',
        take_out: 'true',
        price: '1000',
        address: '〒106-6108 東京都港区六本木６丁目１０番１号'
    },
    latitude: '35.660205',
    longitude: '139.729202',
    company_id: '63cd1b0420cfbda6799d59b1'
  },
  {
    // _id: ObjectId('63d07e7d8a55fa5d23511a7f'),
    id: "2",
    info: {
        name: 'ホワイトボード',
        picture: 'https://sws/s3/picture1.jpeg',
        detail: '使用後は書いたものを消してください',
        requirements: '平日日中のみ',
        take_out: 'true',
        price: '1000',
        address: '〒106-6108 東京都港区六本木６丁目１０番１号'
    },
    latitude: '35.660205',
    longitude: '139.729202',
    company_id: '63cd1b0420cfbda6799d59b1'
  },
  {
    // _id: ObjectId('63d07e7d8a55fa5d23511a7f'),
    id: "3",
    info: {
        name: 'ホワイトボード',
        picture: 'https://sws/s3/picture1.jpeg',
        detail: '使用後は書いたものを消してください',
        requirements: '平日日中のみ',
        take_out: 'true',
        price: '1000',
        address: '〒106-6108 東京都港区六本木６丁目１０番１号'
    },
    latitude: '35.660205',
    longitude: '139.729202',
    company_id: '63cd1b0420cfbda6799d59b1'
  }
];

const MypageItems = () => {
  return (
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
                          {/* <div className="flex-shrink-0">
                            <img className="h-12 w-12 rounded-full" src={item.info.picture} alt="" />
                          </div> */}
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="truncate text-sm font-medium text-amber-600">{item.info.name}</p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <span className="truncate">{item.info.name}</span>
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <div>
                                <p className="text-sm text-gray-900">表示させる項目は要検討</p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">{item.info.name}</p>
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
  );
};

export default MypageItems;