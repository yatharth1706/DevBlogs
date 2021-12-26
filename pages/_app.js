import "../styles/globals.css";
import Layout from "../layouts/layout";
import { AuthProvider } from "../contexts/AuthProvider";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Head from "next/head";
// import NextNprogress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@300&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ReactNotification />
        {/* <NextNprogress /> */}
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
