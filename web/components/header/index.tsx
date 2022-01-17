import { Button, Flex, Text } from "@chakra-ui/react";

const Header: React.FC = () => {
  const user = {
    username: "cptvictor",
    lastMessage: {
      createdAt: Date.now(),
    },
  };

  return (
    <Flex
      as="header"
      minH="10vh"
      align="center"
      justify="space-between"
      bg="#eee"
      px={4}
    >
      <Text as="h3">{user.username}</Text>
      <Button colorScheme="red">Logout</Button>
    </Flex>
  );
};

export default Header;
