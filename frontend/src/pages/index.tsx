import Head from 'next/head';
import Image from 'next/image';
import SearchBox from '@/components/elements/SearchBox';

export default function Home() {
  return (
    <>
      <Head>
        {/* メタディスクリプション要設定 */}
        <title>aruyO</title>
        <meta name="description" content="ご近所同士で備品や設備を貸し借り。地域にあるリソースを可視化するマッチングプラットフォーム。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* favicon要設定 */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* デザインが来たら、随時修正 */}
        <SearchBox />
      </main>
    </>
  );
};
