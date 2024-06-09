import "@/styles/globals.css";
import "@mantine/core/styles.css";
import type { AppProps } from "next/app";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import Head from "next/head";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({});
  const [queryClient] = useState(new QueryClient({}));
  return (
    <>
      <Head>
        <ColorSchemeScript />
      </Head>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
