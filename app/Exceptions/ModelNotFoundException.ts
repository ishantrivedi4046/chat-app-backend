import { ApiErrorCode } from "./ApiErrorCode";
import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ModelNotFoundExcepton('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ModelNotFoundException extends Exception {
  constructor(message: string, errorCode: number = ApiErrorCode.NOT_FOUND) {
    super(message, errorCode);
  }

  public handle(error: Exception, ctx: HttpContextContract) {
    return ctx.response.status(error.status).json({
      message: error.message,
    });
  }
}
