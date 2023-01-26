import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { AuthProvider } from "../context/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <Header />
          <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  );
};
