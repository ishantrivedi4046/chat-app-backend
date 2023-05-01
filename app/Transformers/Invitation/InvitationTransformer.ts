import Invitation from "App/Models/Invitation";
import { Dictionary } from "lodash";
import { TransformerAbstract } from "../TransformerAbstract";

export class InvitationTransformer extends TransformerAbstract<Invitation> {
  protected defaultIncludes = [];
  protected availableIncludes = [];
  protected includesTransformerMapping = {};

  protected _map(invitation: Invitation): Dictionary<any> {
    return {
      id: invitation.id,
      host_id: invitation.host_id,
      room_id: invitation.room_id,
    };
  }
}
