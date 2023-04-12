import { SocketResponseCodes } from "./constants/socketResponseCodes";

export enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  MESSAGE = "message",
  EVENT = "event",
}

export enum ChatEvents {
  PRIVATE_MESSAGE = "message:private",
  NEW_MESSAGE = "message:new",
}

export interface SocketErrorType {
  message: string;
  error_code: SocketResponseCodes;
}

export interface SocketMessageDataType {
  message: string;
  sender_id: number;
  receiver_id: number;
  room_id?: string;
}
