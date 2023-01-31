import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { FieldValues, useForm } from 'react-hook-form';
import { Item } from "@/types/item";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { classNames } from "@/lib/class-names";
import { Tab } from '@headlessui/react'
import Button from "@/components/elements/Button";
import PageTitle from "@/components/elements/PageTitle";
import Loading from "@/components/elements/Loading";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";

const ItemDetail = () => {
  const router = useRouter();
  const [item, setItem] = useState<Item>();
  const user = useRecoilValue(userState);
  const [hydrated, setHydrated] = useState(false);
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const today = new Date();
  registerLocale('ja', ja);

  const itemId = router.query.id || router.asPath.split('/')[3]; // URLからIDを取得
  const {
    handleSubmit,
    // formState: { errors },
  } = useForm();

  useEffect(() => {
    axiosInstance
      .get(`/items/${itemId}`, { withCredentials: true })
      .then((res) => {
        setItem(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setHydrated(true);
  }, [itemId]);

  const getTotalAmount = (price: number) => {
    const days = ( endDate - startDate ) / 86400000 + 1;
    return price * days;
  };

  const getStringFromDate = (date: Date) => {
    let format_str = 'YYYY/MM/DD';

    format_str = format_str.replace(/YYYY/g, date.getFullYear().toString());
    format_str = format_str.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2)); //月だけ+1すること
    format_str = format_str.replace(/DD/g, ("0" + date.getDate()).slice(-2));

    return format_str;
  };

  const onSubmit = async (_data: FieldValues) => {
    const items_copy = item?.info;
    const total = getTotalAmount(Number(item?.info?.price));
    const lenderId = item?.company_id;
    const borrowerId = user.id;

    const orderData = {
      items_copy,
      period: {start: getStringFromDate(startDate), end: getStringFromDate(endDate)},
      payment: {total: total, method: "Stripe", status: "未決済"},
      lender: {_id: lenderId, evaluation: ""},
      borrower: {_id: borrowerId, evaluation: ""},
      status: "予約承認待ち"
    };

    await axiosInstance
      .post("/reserves", orderData, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  if (!hydrated) return null;
  if (!item) return <Loading />; // itemがセットされるまでローディングを表示

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <PageTitle>物品詳細</PageTitle>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* 画像ギャラリー */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* 画像選択 */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {item?.info?.picture.map((picture, index) => (
                  <Tab
                    key={index}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img src={picture} alt={item?.info?.name} className="h-full w-full object-cover object-center" />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-indigo-100' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              {item?.info?.picture.map((picture, index) => (
                <Tab.Panel key={index}>
                  <img
                    src={picture}
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          {/* 物品情報 */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{item?.info?.name}</h1>

            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900">{Number(item?.info?.price).toLocaleString()} 円</p>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="text-xl my-2">
                詳細情報
              </h2>
              <div className="border-t py-2">
                <div className="mb-4">
                  <h3>詳細</h3>
                  <p>{item?.info?.detail}</p>
                </div>
                <div className="mb-4">
                  <h3>条件</h3>
                  <p>{item?.info?.requirements}</p>
                </div>
                <div className="mb-4">
                  <h3>持ち出し</h3>
                  <p>{item?.info?.take_out ? "可" : "不可"}</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="text-xl my-2">
                企業情報
              </h2>
              <div className="border-t py-2">
                <div className="mb-4">
                  <h3>企業名</h3>
                  <p>{item?.company_id}</p>
                </div>
                {/* <div className="mb-4">
                  <h3>条件</h3>
                  <p>{item?.info?.requirements}</p>
                </div>
                <div className="mb-4">
                  <h3>持ち出し</h3>
                  <p>{item?.info?.take_out ? "可" : "不可"}</p>
                </div> */}
              </div>
            </section>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="text-xl my-2">
                利用期間
              </h2>
              <div className="border-t py-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-2 w-full">
                    <DatePicker className="w-full"
                      dateFormat="yyyy/MM/dd"
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      minDate={today}
                      locale='ja'
                      onChange={(update) => {
                        setDateRange(update);
                      }}
                      isClearable={true}
                    />
                  </div>
                  {user ? (
                    <Button type="submit">予約</Button>
                  ) : (
                    <Link href="/signin">
                      <Button>予約</Button>
                    </Link>
                  )}
                </form>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;