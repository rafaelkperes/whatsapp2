import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import LoginForm from "../components/auth/loginForm";
import ChatList from "../components/chat/chatList";
import Header from "../components/header";
import Main from "../layouts/Main";
import { UserType } from "../interface/UserType";

const Home: NextPage = () => {
  const user: UserType = {
    uid: "asd123",
    username: "cptvictor",
    name: "Victor Cardoso Pudo Torres",
    messages: [
      {
        uid: "qwe123",
        content: "Message content",
        createdAt: Date.now(),
        userId: "asd123",
      },
    ],
  };

  return (
    <Main pageTitle="Home">
      <Flex as="article" h="100vh" overflow="hidden">
        <Flex
          as="aside"
          w="30vw"
          direction="column"
          borderRight="1px solid #bbb"
        >
          <Header />
          <ChatList user={user} />
        </Flex>
        <Flex as="section" w="70vw" align="center" justify="center">
          {!user ? (
            <LoginForm />
          ) : (
            <Text as="h2" fontSize="3xl">
              WhatsApp 2
            </Text>
          )}
        </Flex>
      </Flex>

    </Main>
  );
};

export default Home;
