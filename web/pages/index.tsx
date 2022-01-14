import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Header from "../components/header";
import Main from "../layouts/Main";

const Home: NextPage = () => {
  return (
    <Main pageTitle="Home">
      <Header />
      <Text as="h1" fontSize="4xl">
        WhatsApp 2
      </Text>
    </Main>
  );
};

export default Home;
