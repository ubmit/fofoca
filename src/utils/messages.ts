import { Message, LocationMessage } from "../typings";

export const generateMessage = (text: string): Message => ({
  text,
  createdAt: new Date().getTime()
})

export const generateLocationMessage = (locationUrl: string): LocationMessage => ({
  locationUrl,
  createdAt: new Date().getTime()
})

