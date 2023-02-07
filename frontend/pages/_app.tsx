import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

const arcanaProvider = new AuthProvider(
  "56639397ce14b62124c30a0679cc4642b1486386",
  {
    alwaysVisible: true,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth provider={arcanaProvider}>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
