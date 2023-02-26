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
| new UnauthorizedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UnauthenticatedException extends Exception {
  private constructor(message: string, status?: number) {
    super(message, status);
  }

  public static noToken() {
    return new UnauthenticatedException("Token not provided");
  }
  public static invalidToken() {
    return new UnauthenticatedException("Invalid Token");
  }
  public static tokenExpired() {
    return new UnauthenticatedException("Token Expired");
  }

  public handle(error: any, ctx: HttpContextContract) {
    ctx.response.status(401).json({
      message: error.message,
    });
  }
}
