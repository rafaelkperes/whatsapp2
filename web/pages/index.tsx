import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import LoginForm from "../components/auth/loginForm";
import ChatList from "../components/chat/chatList";
import Header from "../components/header";
import Main from "../layouts/Main";
import useStore, { user } from "../store";

const Home: NextPage = () => {
  const { chatList, chatMessages } = useStore();

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
          <ChatList user={user} chatList={chatList} />
        </Flex>
        <Flex as="section" w="70vw" align="center" justify="center">
          {!user ? (
            <LoginForm />
          ) : (
            <>
              <Text as="h2" fontSize="3xl">
                WhatsApp 2
              </Text>
              {chatMessages.messages.map((message) => (
                <Text key={message.uid}>{message.content}</Text>
              ))}
            </>
          )}
        </Flex>
      </Flex>
    </Main>
  );
};

export default Home;
