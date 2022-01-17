import { MessageType } from "./MessageType";

export interface UserType {
  uid: string;
  name: string;
  username: string;
  messages: MessageType[];
}
