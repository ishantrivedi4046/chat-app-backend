import Message from "App/Models/Message";
import { Dictionary } from "lodash";
import { TransformerAbstract } from "../TransformerAbstract";

export class MessageTransformer extends TransformerAbstract<Message> {
  protected defaultIncludes = [];
  protected availableIncludes = [];
  protected includesTransformerMapping = {};

  protected _map(message: Message): Dictionary<any> {
    return {
      id: message.id,
      sender_id: message.sender_id,
      message: message.message,
    };
  }
}
