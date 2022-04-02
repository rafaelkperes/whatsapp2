import { Flex, Text } from "@chakra-ui/react";
import { MessageType } from "../../interface/MessageType";
import { UserType } from "../../interface/UserType";
import useChatStore from "../../stores/useChatStore";

const Chat: React.FC<{
  chatId: string;
  user: UserType;
  messages: MessageType[];
}> = ({ chatId, user, messages }) => {
  const { toggleChat } = useChatStore();
  const userLastMessage = new Date(messages[0].createdAt)
    .toLocaleString()
    .slice(12, 17);

  return (
    <Flex
      as="section"
      p={4}
      _hover={{ backgroundColor: "#ddd", cursor: "pointer" }}
      borderBottom="1px solid #bbb"
      justify="space-between"
      onClick={() => toggleChat(chatId)}
    >
      <Flex as="section" direction="column">
        <Text as="h3" fontSize="xl">
          {user.username}
        </Text>
        <Text>{messages[0].content}</Text>
      </Flex>
      <Text as="h3" fontSize="xl">
        {userLastMessage}
      </Text>
    </Flex>
  );
};

export default Chat;
