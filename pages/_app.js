import "../styles/globals.css";
import "../styles/react-date-picker.css";

import { Fragment } from "react";
import { SessionProvider } from "next-auth/react";
import { GlobalLayout } from "../components/layout";
import { NotificationProvider, Notification } from "../components/Notification";
import { ApiContext } from "../axios";
import { SmsContext } from "../context/sms";
const layouts = {
  GlobalLayout,
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = layouts[Component?.layout] || Fragment;

  return (
    <SessionProvider session={session}>
      <NotificationProvider>
        <Notification />
        <ApiContext>
          <SmsContext>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SmsContext>
        </ApiContext>
      </NotificationProvider>
    </SessionProvider>
  );
}

export default MyApp;
