import { MessageType } from "./MessageType";
import { UserType } from "./UserType";

export interface ChatType {
  uid: string;
  user: UserType;
  messages: MessageType[];
}
