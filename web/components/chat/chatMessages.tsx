import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { ChatType } from "../../interface/ChatType";

const ChatMessages: React.FC<{ chat: ChatType }> = ({ chat }) => {
  return (
    <Flex as="section" direction="column" h="100%">
      <Flex as="header" position="relative" top="0" h="100%" maxH="10vh">
        {chat.user.name}
      </Flex>

      <Flex
        as="section"
        direction="column"
        h="100%"
        align="center"
        justify="center"
      >
        {chat.messages.map((message) => (
          <Text key={message.uid}>{message.content}</Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default ChatMessages;
