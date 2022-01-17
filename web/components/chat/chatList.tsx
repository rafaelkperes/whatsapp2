import { Flex } from "@chakra-ui/react";
import Chat from ".";

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
    </Flex>
  );
};

export default ChatList;
