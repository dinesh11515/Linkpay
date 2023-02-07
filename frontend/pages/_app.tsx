import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

const arcanaProvider = new AuthProvider(
  "56639397ce14b62124c30a0679cc4642b1486386",
  {
    position: "left", // defaults to right
    theme: "light", // defaults to dark
    alwaysVisible: true, // defaults to true which is Full UI mode
    chainConfig: {
      chainId: "0x1",
      rpcUrl: "https://rpc.testnet.mantle.xyz	",
    },
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth provider={arcanaProvider}>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
