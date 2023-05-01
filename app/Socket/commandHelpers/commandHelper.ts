import { loggerService } from "App/Services/LoggerService";
import { Socket } from "socket.io";
import { SocketCommandHandlerAbstract } from "../abstracts/SocketResponseAbstract";
import { MessageCommandHelper } from "../handlers/MessageCommandHelper";
import { ChatEvents, SocketErrorType } from "../types";

interface CommandConstructor {
  new (payload: any, socket: Socket): SocketCommandHandlerAbstract;
}

const commandMapping: { [name: string]: CommandConstructor } = {
  [ChatEvents.PRIVATE_MESSAGE]: MessageCommandHelper,
};

export async function SocketCommandHelper<T>(socket: Socket, event: ChatEvents, payload: T) {
  const command = commandMapping[event];
  const result = await new command(payload, socket).execute();
  if (result.hasOwnProperty("error_code")) {
    loggerService.error((result as SocketErrorType).message);
  } else {
    loggerService.info(result);
  }
}
