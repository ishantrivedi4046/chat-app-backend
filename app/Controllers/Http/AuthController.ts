import Hash from "@ioc:Adonis/Core/Hash";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BadrequestException from "App/Exceptions/BadrequestException";
import InternalServerException from "App/Exceptions/InternalServerException";
import InvalidCredentialsException from "App/Exceptions/User/InvalidCredentialException";
import User from "App/Models/User";
import { jwtService } from "App/Services/JWTService";
import { notificationService } from "App/Services/NotificationService";
import { userService } from "App/Services/UserService";
import { UserTransformer } from "App/Transformers/User/UserTransformer";
import LoginValidator from "App/Validators/Auth/LoginValidator";
import SignupValidator from "App/Validators/SignupValidator";

export default class AuthController {
  public async login({ request, response }: HttpContextContract) {
    const sanitizedPayload = await request.validate(LoginValidator);

    const { email, user_name, password } = sanitizedPayload;

    if (!email && !user_name) {
      throw new BadrequestException(
        "Both email and username are missing from login details. Please add atleast one to login!"
      );
    }

    let user: User | null;
    if (email) {
      user = await userService.findByUserColumn("email", email!);
    } else {
      user = await userService.findByUserColumn("user_name", user_name!);
    }

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
  }

  public async signup({ request }: HttpContextContract) {
    const sanitizedPayload = await request.validate(SignupValidator);
    const { email, phone } = sanitizedPayload;
    if (!email && !phone) {
      throw new BadrequestException(
        "Both email and phone number are missing from user details. Please add atleast one to signup!"
      );
    }

    if (email) {
      const user = await userService.findByUserColumn("email", email);
      if (user) {
        throw new BadrequestException("User with same email already exists!");
      }
    } else if (phone) {
      const user = await userService.findByUserColumn("phone", phone);
      if (user) {
        throw new BadrequestException("User with same phone number already exists!");
      }
    }

    const createdUser = await userService.creatUser(sanitizedPayload);
    if (createdUser) {
      if (email) {
        await notificationService.sendWelcomeEmail(createdUser);
      }
      return {
        data: new UserTransformer().transform(createdUser),
      };
    }

    return {
      data: {},
    };
  }

  public async verifyUser({ params }: HttpContextContract) {
    const { id } = params;
    const user = await userService.findById(id);
    if (!user) {
      throw new InternalServerException("User does not exists!");
    }
    await userService.updateUserColumns(user, { is_verified: true });

    return {
      success: true,
    };
  }
}
