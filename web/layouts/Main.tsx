import React from "react";
import Head from "next/head";

const Main: React.FC<{ children: React.ReactNode; pageTitle: string }> = ({
  children,
  pageTitle,
}) => {
  return (
    <main>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="An app that's supposed to look like a whatsapp."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </main>
  );
};

export default Main;
