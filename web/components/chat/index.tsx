import { Flex, Text } from "@chakra-ui/react";

const Chat: React.FC<{ user: any }> = ({ user }) => {
  const userLastMessage = new Date(user.messages[0].createdAt)
    .toLocaleString()
    .slice(12, 17);
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
        <Text>{user.messages[0].content}</Text>
      </Flex>
      <Text as="h3" fontSize="xl">
        {userLastMessage}
      </Text>
    </Flex>
  );
};

export default Chat;
