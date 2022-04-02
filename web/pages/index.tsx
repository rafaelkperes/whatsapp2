import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import LoginForm from "../components/auth/LoginForm";
import ChatList from "../components/chat/ChatList";
import ChatMessages from "../components/chat/ChatMessages";
import Header from "../components/header";
import { ChatType } from "../interface/ChatType";
import Main from "../layouts/Main";
import useStore from "../stores/store";
import { user1 } from "../mocks";
import useChatStore from "../stores/useChatStore";

const Home: NextPage = () => {
  const { chatList } = useStore();
  const { isOpen, chatId } = useChatStore();

  const findChat = (chatList: ChatType[]) => {
    return chatList.map((chat) => {
      if (chat.uid === chatId) {
        return <ChatMessages chat={chat} />;
      }
    });
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
          <ChatList chatList={chatList} />
        </Flex>
        <Flex as="section" w="70vw" align="center" justify="center">
          {!user1 ? (
            <LoginForm />
          ) : (
            <>
              {isOpen ? (
                findChat(chatList)
              ) : (
                <Text as="h2" fontSize="3xl">
                  WhatsApp 2
                </Text>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Main>
  );
};

export default Home;
