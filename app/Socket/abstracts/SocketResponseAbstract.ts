import { get } from "lodash";
import { SocketErrorResponse } from "../responses/SocketErrorResponse";
import { SocketErrorType } from "../types";

export abstract class SocketCommandHandlerAbstract<T = {}> {
  protected userId: number;

  protected abstract isValid(): Promise<undefined>;
  protected abstract handle(): Promise<T | SocketErrorType>;

  constructor(userId: number) {
    this.userId = userId;
  }

  public async execute(): Promise<T | SocketErrorType> {
    try {
      await this.isValid();
    } catch (e) {
      return new SocketErrorResponse(get(e, ["message"], "Invalid Socket!")).handle();
    }
    return await this.handle();
  }
}
