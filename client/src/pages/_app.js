import "@/styles/globals.css";
import Middleware from "@/utils/middleware";

export default function App({ Component, pageProps }) {
  return (
    <>
      {" "}
      <Middleware>
        <Component {...pageProps} />
      </Middleware>
    </>
  );
}
