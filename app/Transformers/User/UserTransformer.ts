import User from "App/Models/User";
import { Dictionary } from "@ioc:Adonis/Lucid/Database";
import { TransformerAbstract } from "App/Transformers/TransformerAbstract";
import { Helpers } from "App/Utils/helpers.util";

export class UserTransformer extends TransformerAbstract<User> {
  protected defaultIncludes = [];
  protected availableIncludes = [];
  protected includesTransformerMapping = {};

  protected _map(user: User): Dictionary<any> {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: Helpers.replaceUndefinedWithNull(user.last_name),
      user_name: user.user_name,
      email: user.email,
      phone: Helpers.replaceUndefinedWithNull(user.phone),
      profile_image_url: Helpers.replaceUndefinedWithNull(user.profile_image_url),
    };
  }
}
