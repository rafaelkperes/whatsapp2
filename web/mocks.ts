import { UserType } from "./interface/UserType";

export const user1: UserType = {
  uid: "1",
  username: "anneasd",
  name: "Anna Campelo",
};
export const user2: UserType = {
  uid: "2",
  username: "cptvictor",
  name: "Victor Cardoso Pudo Torres",
};

export const userChats = [
  {
    uid: "1",
    user: user1,
    messages: [
      {
        uid: "1",
        content: "oi flefs",
        createdAt: Date.now(),
        userId: "1",
      },
      {
        uid: "2",
        content: "Message 2",
        createdAt: Date.now(),
        userId: "11",
      },
    ],
  },
  {
    uid: "2",
    user: user2,
    messages: [
      {
        uid: "1",
        content: "Message 1",
        createdAt: Date.now(),
        userId: "2",
      },
      {
        uid: "2",
        content: "Message 2",
        createdAt: Date.now(),
        userId: "2",
      },
    ],
  },
];
