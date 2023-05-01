import { messageService } from "App/Services/MessageService";
import WsService from "App/Services/WsService";
import { Socket } from "socket.io";
import { SocketCommandHandlerAbstract } from "../abstracts/SocketResponseAbstract";
import { ChatEvents, SocketErrorType, SocketMessageDataType } from "../types";

export class MessageCommandHelper<
  T extends SocketMessageDataType
> extends SocketCommandHandlerAbstract {
  public userSocket: Socket;
  public messagePayload: T;
  constructor(payload: T, socket: Socket) {
    const { userId } = payload;
    super(userId);
    this.userSocket = socket;
  }
  protected async isValid(): Promise<undefined> {
    return Promise.resolve().then(() => undefined);
  }
  protected async handle(): Promise<{} | SocketErrorType> {
    const { room_id, message } = this.messagePayload;
    const senderId = WsService.getUserIdBySocket(this.userSocket.id);
    const nMessage = await messageService.createMessage({ room_id, message, sender_id: senderId });
    this.userSocket.to(room_id).emit(ChatEvents.NEW_MESSAGE, nMessage.serialize());
    return Promise.resolve().then(() => ({}));
  }
}
