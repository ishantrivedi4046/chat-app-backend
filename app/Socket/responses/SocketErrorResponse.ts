import { SocketResponseCodes } from "../constants/socketResponseCodes";
import { SocketErrorType } from "../types";

export class SocketErrorResponse {
  private message: string;
  private code: number;

  constructor(errorMessage: string, errorCode: number = SocketResponseCodes.ERROR) {
    this.message = errorMessage;
    this.code = errorCode;
  }

  public handle(): SocketErrorType {
    return {
      message: this.message,
      error_code: this.code,
    };
  }
}
