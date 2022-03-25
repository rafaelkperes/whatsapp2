import create from "zustand";
import { ChatType } from "./interface/ChatType";
import { MessageType } from "./interface/MessageType";
import { UserType } from "./interface/UserType";

export type Store = {
  chatList: ChatType[];
  newMessage: MessageType;
  chatMessages: ChatType;
  showChatList: () => void;
};

export const user: UserType = {
  uid: "asd123",
  username: "cptvictor",
  name: "Victor Cardoso Pudo Torres",
};

const useStore = create<Store>((set) => ({
  chatList: [
    {
      uid: "chatId123",
      user: user,
      messages: [
        {
          uid: "qwe123",
          content: "Message 1",
          createdAt: Date.now(),
          userId: "asd123",
        },
        {
          uid: "qwe1234",
          content: "Message 2",
          createdAt: Date.now(),
          userId: "asd1234",
        },
      ],
    },
  ],
  chatMessages: {
    uid: "chatId123",
    user: user,
    messages: [
      {
        uid: "qwe123",
        content: "Message 1",
        createdAt: Date.now(),
        userId: "asd123",
      },
      {
        uid: "qwe1234",
        content: "Message 2",
        createdAt: Date.now(),
        userId: "asd1234",
      },
    ],
  },
  newMessage: {
    uid: "",
    content: "",
    createdAt: Date.now(),
    userId: "",
  },
  showChatList() {
    set((state) => ({
      ...state,
      chatList: state.chatList,
    }));
  },
}));

export default useStore;
