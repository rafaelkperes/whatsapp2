import { Flex } from "@chakra-ui/react";
import Chat from ".";
<<<<<<< HEAD
import { ChatType } from "../../interface/ChatType";
import { UserType } from "../../interface/UserType";

const ChatList: React.FC<{ user: UserType; chatList: ChatType[] }> = ({
  user,
  chatList,
}) => {
  return (
    <Flex direction="column" overflowY="scroll">
      {chatList.map((chat) => {
        return (
          <Chat
            key={chat.uid}
            chatId={chat.uid}
            user={user}
            messages={chat.messages}
          />
        );
      })}
=======

const ChatList: React.FC<{ user: any }> = ({ user }) => {
  return (
    <Flex direction="column" overflowY="scroll">
      <Chat user={user} />
      <Chat user={user} />
      <Chat user={user} />
      <Chat user={user} />
      <Chat user={user} />
      <Chat user={user} />
      <Chat user={user} />
      <Chat user={user} />
      <Chat user={user} />
>>>>>>> a6e8a8892d2d30b03e323ff7adb91b5fa3503d97
    </Flex>
  );
};

export default ChatList;
