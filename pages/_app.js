import AppStore from "@/context/AppContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AppStore>
      <Component {...pageProps} />
    </AppStore>
  );
}
