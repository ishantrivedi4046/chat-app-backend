import User from "App/Models/User";
import { Dictionary } from "@ioc:Adonis/Lucid/Database";
import { Helpers } from "App/Utils/helpers.util";
import { TransformerAbstract } from "App/Transformers/TransformerAbstract";

export class UserTransformer extends TransformerAbstract<User> {
  protected defaultIncludes = [];
  protected availableIncludes = [];
  protected includesTransformerMapping = {};

  protected _map(user: User): Dictionary<any> {
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: Helpers.replaceUndefinedWithNull(user.last_name),
      email: user.email,
    };
  }
}
