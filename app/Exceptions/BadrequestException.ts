import { Exception } from "@adonisjs/core/build/standalone";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ApiErrorCode } from "./ApiErrorCode";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new BadrequestException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class BadrequestException extends Exception {
  constructor(message?: string) {
    super(message ? message : "Something Went Wrong!", ApiErrorCode.BAD_REQUEST);
  }

  public handle(error: any, { response }: HttpContextContract) {
    response.status(ApiErrorCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
}
