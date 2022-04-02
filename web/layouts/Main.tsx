import React from "react";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

const Main: React.FC<{ children: React.ReactNode; pageTitle: string }> = ({
  children,
  pageTitle,
}) => {
  return (
    <Flex as="main" direction="column" h="100%">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="An app that's supposed to look like a whatsapp."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </Flex>
  );
};

export default Main;
