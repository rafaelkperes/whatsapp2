import create from "zustand";

export type ChatStore = {
  isOpen: boolean;
  chatId: string;
  toggleChat: (chatId: string) => void;
};

const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  chatId: "",
  toggleChat: (chatId) => {
    set((state) => ({
      ...state,
      isOpen: Boolean(chatId),
      chatId: chatId,
    }));
  },
}));

export default useChatStore;
