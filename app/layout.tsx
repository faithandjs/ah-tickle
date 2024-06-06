import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Nav, Footer } from "@/components";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import Head from "next/head";
import { Metadata } from "next";

const defaultUrl = process.env.VERCEL_URL
  ? process.env.VERCEL_URL
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Ah-tickle",
  description: "A daily reading tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });
  return (
    <html lang="en" className={GeistSans.className}>
      {/* <Head>
        <ColorSchemeScript />
      </Head> */}
      <body className="bg-white text-slate-950 font-inter ">
        <MantineProvider theme={theme}>
          <Nav />
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
//bg-background text-foreground
