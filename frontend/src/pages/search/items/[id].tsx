import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { FieldValues, useForm } from 'react-hook-form';
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import { Item } from "@/types/item";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { classNames } from "@/lib/class-names";
import { getNumberOfDays } from "@/utils/getNumberOfDays";
import { getStringFromDate } from "@/utils/getStringFromData";
import { Tab } from '@headlessui/react'
import Button from "@/components/elements/Button";
import PageTitle from "@/components/elements/PageTitle";
import Loading from "@/components/elements/Loading";

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

  const getTotalAmount = (basePrice: number, days: number) => {
    return basePrice * days;
  };

  // const getStringFromDate = (date: Date) => {
  //   let format_str = 'YYYY/MM/DD';

  //   format_str = format_str.replace(/YYYY/g, date.getFullYear().toString());
  //   format_str = format_str.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2)); //月だけ+1すること
  //   format_str = format_str.replace(/DD/g, ("0" + date.getDate()).slice(-2));

  //   return format_str;
  // };

  const onSubmit = async (_data: FieldValues) => {
    const itemsCopy = item?.info;
    const startDateStr = getStringFromDate(startDate);
    const endDateStr = getStringFromDate(endDate);
    const basePrice = Number(itemsCopy?.price);
    const days = getNumberOfDays(startDate, endDate);
    const total = getTotalAmount(basePrice, days);
    const paymentMethod = "Stripe";
    const paymentStatus = "未決済";
    const lenderId = item?.company_id;
    const borrowerId = user.id;
    const orderStatus = "予約確定";
    const connectedId = "acct_1MWZMz2eYfpnkUc7"; // TODO: DBにフィールドを作成、ダッシュボードで発行したIDをテストデータに追加

    const orderData = {
      items_copy: itemsCopy,
      period: {start: startDateStr, end: endDateStr},
      payment: {total: total, method: paymentMethod, status: paymentStatus},
      lender: {_id: lenderId, evaluation: ""},
      borrower: {_id: borrowerId, evaluation: ""},
      status: orderStatus
    };

    const stripeCheckoutData = {
      account: connectedId,
      item_name: itemsCopy?.name,
      item_description: `受取日: ${startDateStr} 〜 返却日: ${endDateStr}  計: ${days}日`,
      item_image: itemsCopy?.pictures[0],
      base_price: basePrice,
      quantity: days,
    };

    await axiosInstance
      .post("/reserves", orderData, { withCredentials: true })
      .then((res) => {
        console.log(res);
        // return payment(stripeCheckoutData);
        return createStripeCheckoutSession(stripeCheckoutData);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const createStripeCheckoutSession = async (data: any) => {
    await axiosInstance
      .post("create-checkout-session", data, { withCredentials: true })
      .then((res) => {
        console.log(res);
        router.push(res.data.checkout_session_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // フロントからStripe用APIが叩けるか動作確認
  // const onSubmit = async (_data: FieldValues) => {
  //   const connectedId = "acct_1MWZMz2eYfpnkUc7";
  //   const items_copy = item?.info;
  //   const data = {
  //     account: connectedId,
  //     item_name: items_copy?.name,
  //     item_description: `受取日: ${startDate} 〜 返却日: ${endDate}  計: ${( endDate - startDate ) / 86400000 + 1}日`,
  //     item_image: items_copy?.pictures[0],
  //     base_price: Number(items_copy?.price),
  //     quantity: ( endDate - startDate ) / 86400000 + 1,
  //     metadata: items_copy
  //   };

  //   await axiosInstance
  //     .post("create-checkout-session", data, { withCredentials: true })
  //     .then((res) => {
  //       console.log(res);
  //       router.push(res.data.checkout_session_url);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
                {item?.info?.pictures?.map((picture, index) => (
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
              {item?.info?.pictures?.map((picture, index) => (
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
