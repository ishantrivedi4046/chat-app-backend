import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import InternalServerException from "App/Exceptions/InternalServerException";
import UserNotFoundException from "App/Exceptions/User/UserNotFoundException";
import { userService } from "App/Services/UserService";
import { UserTransformer } from "App/Transformers/User/UserTransformer";

export default class UsersController {
  public async me({ request, response }: HttpContextContract) {
    try {
      const data = await userService.findById(request.loggedInUser.id);

      if (!data) {
        throw new UserNotFoundException(request.loggedInUser.id);
      }

      return response.status(200).json({
        data: {
          ...new UserTransformer().transform(data),
        },
      });
    } catch (err) {
      throw new InternalServerException(err);
    }
  }
}
