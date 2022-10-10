import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { parseCookies } from "nookies";
import { Api } from "../utils/api";
import { setUserData } from "../redux/slices/user";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const { sd_token } = parseCookies(ctx);
        const userData = await Api(ctx).user.getMe(sd_token);

        store.dispatch(setUserData(userData));
      } catch (err) {
        if (ctx.asPath === "/") {
          ctx.res.writeHead(302, {
            Location: "/login",
          });
          ctx.res.end();
        }
        console.log(err);
      }

      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps({ ...ctx, store })
          : {},
      };
    }
);

export default wrapper.withRedux(App);
