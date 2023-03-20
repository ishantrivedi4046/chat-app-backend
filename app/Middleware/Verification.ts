import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import InternalServerException from "App/Exceptions/InternalServerException";
import { userService } from "App/Services/UserService";

export default class Verification {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const { email } = request.body();
    if (email) {
      const user = await userService.findByUserColumn("email", email);
      if (user && !user.is_verified) {
        throw new InternalServerException(
          "User with this email is not verified. Please verify user to continue."
        );
      }
    }
    await next();
  }
}
