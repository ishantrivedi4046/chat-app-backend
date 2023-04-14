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

export interface SocketCommandHelperBasePayload {
  userId: number;
}
export interface SocketMessageDataType extends SocketCommandHelperBasePayload {
  message: string;
  room_id: string;
}
