import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import LoginForm from "../components/auth/loginForm";
import ChatList from "../components/chat/chatList";
import Header from "../components/header";
import Main from "../layouts/Main";
<<<<<<< HEAD
import useStore, { user } from "../store";

const Home: NextPage = () => {
  const { chatList, chatMessages } = useStore();
=======
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
>>>>>>> a6e8a8892d2d30b03e323ff7adb91b5fa3503d97

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
<<<<<<< HEAD
          <ChatList user={user} chatList={chatList} />
=======
          <ChatList user={user} />
>>>>>>> a6e8a8892d2d30b03e323ff7adb91b5fa3503d97
        </Flex>
        <Flex as="section" w="70vw" align="center" justify="center">
          {!user ? (
            <LoginForm />
          ) : (
<<<<<<< HEAD
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
=======
            <Text as="h2" fontSize="3xl">
              WhatsApp 2
            </Text>
          )}
        </Flex>
      </Flex>

>>>>>>> a6e8a8892d2d30b03e323ff7adb91b5fa3503d97
    </Main>
  );
};

export default Home;
