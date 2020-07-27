import { Message } from "../typings";

export const generateMessage = (text: string): Message => ({
  text,
  createdAt: new Date().getTime()
})
