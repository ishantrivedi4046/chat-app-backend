import UserNotFoundException from "App/Exceptions/User/UserNotFoundException";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UnauthenticatedException from "App/Exceptions/UnauthenticatedException";
import { jwtService } from "App/Services/JWTService";
import { userService } from "App/Services/UserService";

export default class Auth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const token = ctx.request.headers().authorization?.slice(7);
    if (!token) {
      throw UnauthenticatedException.noToken();
    }
    try {
      const data: any = await jwtService.verify(token);

      const user = await userService.findById(data.sub);

      if (!user) {
        throw new UserNotFoundException(data.sub);
      }

      ctx.request.loggedInUser = user;
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        throw UnauthenticatedException.tokenExpired();
      }
      throw UnauthenticatedException.invalidToken();
    }
    await next();
  }
}
