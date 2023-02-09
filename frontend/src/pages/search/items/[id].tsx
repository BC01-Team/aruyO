import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { FieldValues, useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import { Item } from "@/types/item";
import { useRecoilValue } from "recoil";
import { userState } from "@/lib/atom";
import { getNumberOfDays } from "@/utils/getNumberOfDays";
import { getStringFromDate } from "@/utils/getStringFromData";
import { getTotalAmount } from "@/utils/getTotalAmount";
import ImageGallery from "@/components/elements/details/ImageGallery";
import Button from "@/components/elements/Button";
import Loading from "@/components/elements/Loading";

const ItemDetail = () => {
  const router = useRouter();
  const [item, setItem] = useState<Item>();
  const user = useRecoilValue(userState);
  const [hydrated, setHydrated] = useState(false);
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const today = new Date();
  registerLocale("ja", ja);

  const itemId = router.query.id || router.asPath.split("/")[3]; // URLからIDを取得
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

  const onSubmit = async (_data: FieldValues) => {
    const itemsCopy = item?.info;
    const startDateStr = getStringFromDate(startDate);
    const endDateStr = getStringFromDate(endDate);
    const basePrice = Number(itemsCopy?.price);
    const days = getNumberOfDays(startDate, endDate);
    const total = getTotalAmount(basePrice, days);
    const paymentMethod = "Stripe";
    const paymentStatus = "未決済";
    const lenderId = item?.lender?.company_id;
    const borrowerId = user.id;
    const orderStatus = "予約確定";
    const connectedId = item?.lender?.stripe_connected_id;

    const orderData = {
      items_copy: itemsCopy,
      period: { start: startDateStr, end: endDateStr },
      payment: { total: total, method: paymentMethod, status: paymentStatus },
      lender: { id: lenderId, evaluation: "" },
      borrower: { id: borrowerId, evaluation: "" },
      status: orderStatus,
    };

    await axiosInstance
      .post("/reserves/", orderData, { withCredentials: true })
      .then((res) => {
        console.log(res);

        const stripeCheckoutData = {
          account: connectedId,
          item_name: itemsCopy?.name,
          item_description: `受取日: ${startDateStr} 〜 返却日: ${endDateStr}  計: ${days}日`,
          item_image: itemsCopy?.pictures[0],
          base_price: basePrice,
          quantity: days,
          metadata: {
            item_id: itemId,
            reservation_id: res.data._id,
          },
        };

        return createStripeCheckoutSession(stripeCheckoutData);
      })
      .catch((error) => {
        console.log(error);
      });
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

  if (!hydrated) return null;
  if (!item) return <Loading />; // itemがセットされるまでローディングを表示

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* <PageTitle>物品詳細</PageTitle> */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <ImageGallery alt={item?.info?.name}>
              {item?.info?.pictures}
            </ImageGallery>

          {/* 物品情報 */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {item?.info?.name}
            </h1>

            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900">
                {Number(item?.info?.price).toLocaleString()} 円
              </p>
            </div>

            <section aria-labelledby="details-heading" className="mt-8">
              <h2 id="details-heading" className="text-xl my-2">
                詳細情報
              </h2>
              <div className="border-t py-2">
                {/* 物品詳細 */}
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    詳細
                  </h3>
                  <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                    <p>{item?.info?.detail}</p>
                  </div>
                </div>

                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    条件
                  </h3>
                  <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                    <p>{item?.info?.requirements ? (item?.info?.requirements) : "なし"}</p>
                  </div>
                </div>

                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    持ち出し
                  </h3>
                  <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                    <p>{item?.info?.take_out ? "可" : "不可"}</p>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="details-heading" className="mt-2">
              <h2 id="details-heading" className="text-xl my-2">
                企業情報
              </h2>
              <div className="border-t py-2">
                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    企業名
                  </h3>
                  <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                    <p>{item?.lender?.company_name}</p>
                  </div>
                </div>

                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    貸出場所
                  </h3>
                  <div className="text-sm font-normal text-gray-900 mt-2 mb-7">
                    <p>{item?.info?.address}</p>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="details-heading" className="mt-2">
              <h2 id="details-heading" className="text-xl my-2">
                利用期間
              </h2>
              <div className="border-t py-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-2 w-full">
                    <DatePicker
                      className="w-full"
                      dateFormat="yyyy/MM/dd"
                      selectsRange={true}
                      startDate={startDate}
                      endDate={endDate}
                      minDate={today}
                      locale="ja"
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