import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import Map from "@/components/elements/GoogleMap";
import SearchBox from "@/components/elements/SearchBox";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <>
      <Head>
        {/* メタディスクリプション要設定 */}
        <title>aruyO</title>
        <meta
          name="description"
          content="ご近所同士で備品や設備を貸し借り。地域にあるリソースを可視化するマッチングプラットフォーム。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section>
          <div className="flex-col mt-4 mx-10">
            <img className="w-fit" src="/img/topPage/topImage.jpg" alt="" />
          </div>
        </section>
        {/* 以下、おすすめ物品の表示部分はモックのため直書き */}
        <section>
          <div className="relative mx-12">
            <img
              className="absolute top-0 right-0 w-1/6 sm:w-32"
              src="/img/topPage/camera.png"
            />
            <div className="my-8">
              <div className="mx-auto text-center">
                <img
                  className="mx-auto -mb-6"
                  src="/img/topPage/underLine.png"
                />
                <p className=" text-gray-500 font-sans font-bold text-xs md:text-xl">
                  おすすめの商品
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー1</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー2</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー3</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー4</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー5</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー6</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー7</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー8</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー9</p>
                </div>
              </div>
              <div className="mx-auto">
                <div className="px-3">
                  <img className="" src="/img/topPage/moc/category_1.jpg" />
                  <p className="mx-auto">ソファー10</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
