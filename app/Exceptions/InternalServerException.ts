import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ApiErrorCode } from "./ApiErrorCode";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@poppinss/utils` allows defining
| a status code and error code for every exception.
|
| @example
| new InternalServerException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class InternalServerException extends Exception {
  constructor(message?: string) {
    super(message ? message : "Internal Server Error", ApiErrorCode.INTERNAL_SERVER_ERROR);
  }

  public handle(error: any, { response }: HttpContextContract) {
    response.status(500).json({
      message: error.message,
    });
  }
}
