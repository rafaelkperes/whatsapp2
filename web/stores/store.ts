import create from "zustand";
import { ChatType } from "../interface/ChatType";
import { MessageType } from "../interface/MessageType";

import { userChats } from "../mocks";

export type Store = {
  chatList: ChatType[];
  newMessage: MessageType;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStore = create<Store>((set) => ({
  chatList: userChats,
  newMessage: {
    uid: "",
    content: "",
    createdAt: Date.now(),
    userId: "",
  },
}));

export default useStore;
