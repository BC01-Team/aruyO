import { GetServerSideProps } from "next";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import Sidebar from "@/components/layouts/mypage/Sidebar";
import MypageLayout from "@/components/layouts/mypage/MypageLayout";
import PageTitle from "@/components/layouts/mypage/PageTitle";
import ContentsLayout from "@/components/layouts/mypage/ContentsLayout";



const MypageOrders = ({ orders }: any) => {
  return (
    <>
      <Sidebar />
      <MypageLayout>
        <PageTitle>取引（予約）一覧</PageTitle>
        <ContentsLayout>
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {orders.map((order, index) => {
                return (
                  <li key={index}>
                    <Link
                      as={`/mypage/orders/${order._id}`}
                      href={{ pathname: `/mypage/orders/[id]`, query: order._id }}
                    >
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="flex min-w-0 flex-1 items-center">
                          {/* <div className="flex-shrink-0">
                            <img className="h-12 w-12 rounded-full" src={item.info.picture} alt="" />
                          </div> */}
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="truncate text-sm font-medium text-amber-600">{order._id}</p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <span className="truncate">{order._id}</span>
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <div>
                                <p className="text-sm text-gray-900">表示させる項目は要検討</p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">{order._id}</p>
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

export const getServerSideProps: GetServerSideProps = async () => {
  // const res = await axiosInstance.get("/");
  // const data = await res.data;

  const orders = [
    {
      // _id: ObjectId('63d07e7d8a55fa5d23511a80'),
      _id: '63d07e7d8a55fa5d23511a80',
      exhibits_copy: {
          _id: '63cd1b0420cfbda6799aaaaa',
          name: 'ホワイトボード',
          picture: 'https://sws/s3/picture1.jpeg',
          detail: '使用後は書いたものを消してください',
          requirements: '平日日中のみ',
          take_out: 'true',
          price: '1000',
          address: '〒106-6108 東京都港区六本木６丁目１０番１号'
      },
      period: {
          start: '2023/2/1',
          end: '2023/2/5'
      },
      payment: {
          total: '5000',
          method: 'stripe',
          status: '決済完了'
      },
      lender: {
          _id: '63cd1b0420cfbda6799d59b1',
          evaluation: '3'
      },
      borrower: {
          _id: '63cd1b0420cfbda679911111',
          evaluation: '3'
      }
    },
    {
      // _id: ObjectId('63d07e7d8a55fa5d23511a80'),
      _id: '63d07e7d8a55fa5d23511a80',
      exhibits_copy: {
          _id: '63cd1b0420cfbda6799aaaaa',
          name: 'ホワイトボード',
          picture: 'https://sws/s3/picture1.jpeg',
          detail: '使用後は書いたものを消してください',
          requirements: '平日日中のみ',
          take_out: 'true',
          price: '1000',
          address: '〒106-6108 東京都港区六本木６丁目１０番１号'
      },
      period: {
          start: '2023/2/1',
          end: '2023/2/5'
      },
      payment: {
          total: '5000',
          method: 'stripe',
          status: '決済完了'
      },
      lender: {
          _id: '63cd1b0420cfbda6799d59b1',
          evaluation: '3'
      },
      borrower: {
          _id: '63cd1b0420cfbda679911111',
          evaluation: '3'
      }
    },
  ];

  return {
    props: { orders }
  }
};

export default MypageOrders;