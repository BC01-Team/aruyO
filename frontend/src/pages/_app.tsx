import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { AuthProvider } from "../context/auth";
import { RecoilRoot } from "recoil";
import "react-datepicker/dist/react-datepicker.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <AuthProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </RecoilRoot>
    </>
  );
};
