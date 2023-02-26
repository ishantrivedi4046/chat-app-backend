import Hash from "@ioc:Adonis/Core/Hash";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import InternalServerException from "App/Exceptions/InternalServerException";
import InvalidCredentialsException from "App/Exceptions/User/InvalidCredentialException";
import { jwtService } from "App/Services/JWTService";
import { userService } from "App/Services/UserService";
import { UserTransformer } from "App/Transformers/User/UserTransformer";
import LoginValidator from "App/Validators/Auth/LoginValidator";

export default class AuthController {
  public async login({ request, response }: HttpContextContract) {
    try {
      const sanitizedPayload = await request.validate(LoginValidator);

      const { email, password } = sanitizedPayload;

      const user = await userService.findByEmail(email!);

      if (!user || !user.password) {
        throw new InvalidCredentialsException();
      }

      const verified = await Hash.verify(user.password, password);
      if (!verified) {
        throw new InvalidCredentialsException();
      }
      const subObj = { sub: user.id };
      const token = await jwtService.sign(subObj);

      return response.json({
        token,
        data: {
          ...new UserTransformer().transform(user),
        },
      });
    } catch (e) {
      throw new InternalServerException(e);
    }
  }
}
