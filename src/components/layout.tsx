import React from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="min-h-screen flex flex-col items-center text-text-primary">
        {children}
      </main>
      <Footer />{" "}
    </>
  );
}
