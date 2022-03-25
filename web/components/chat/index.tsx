import { Flex, Text } from "@chakra-ui/react";
<<<<<<< HEAD
import { MessageType } from "../../interface/MessageType";
import { UserType } from "../../interface/UserType";

const Chat: React.FC<{
  chatId: string;
  user: UserType;
  messages: MessageType[];
}> = ({ chatId, user, messages }) => {
  const userLastMessage = new Date(messages[0].createdAt)
    .toLocaleString()
    .slice(12, 17);

=======

const Chat: React.FC<{ user: any }> = ({ user }) => {
  const userLastMessage = new Date(user.messages[0].createdAt)
    .toLocaleString()
    .slice(12, 17);
>>>>>>> a6e8a8892d2d30b03e323ff7adb91b5fa3503d97
  return (
    <Flex
      as="section"
      p={4}
      _hover={{ backgroundColor: "#ddd", cursor: "pointer" }}
      borderBottom="1px solid #bbb"
      justify="space-between"
    >
      <Flex as="section" direction="column">
        <Text as="h3" fontSize="xl">
          {user.username}
        </Text>
<<<<<<< HEAD
        <Text>{messages[0].content}</Text>
=======
        <Text>{user.messages[0].content}</Text>
>>>>>>> a6e8a8892d2d30b03e323ff7adb91b5fa3503d97
      </Flex>
      <Text as="h3" fontSize="xl">
        {userLastMessage}
      </Text>
    </Flex>
  );
};

export default Chat;
