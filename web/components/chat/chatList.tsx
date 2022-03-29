import { Flex } from "@chakra-ui/react";
import Chat from ".";
import { ChatType } from "../../interface/ChatType";

const ChatList: React.FC<{ chatList: ChatType[] }> = ({ chatList }) => {
  return (
    <Flex direction="column" overflowY="scroll">
      {chatList.map((chat) => {
        return (
          <Chat
            key={chat.uid}
            chatId={chat.uid}
            user={chat.user}
            messages={chat.messages}
          />
        );
      })}
    </Flex>
  );
};

export default ChatList;
