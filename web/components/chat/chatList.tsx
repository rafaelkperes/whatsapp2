import { Flex } from "@chakra-ui/react";
import Chat from ".";
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
    </Flex>
  );
};

export default ChatList;
