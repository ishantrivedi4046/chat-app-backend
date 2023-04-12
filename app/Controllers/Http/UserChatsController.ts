import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BadrequestException from "App/Exceptions/BadrequestException";
import InternalServerException from "App/Exceptions/InternalServerException";
import Invitation from "App/Models/Invitation";
import { invitationService } from "App/Services/InvitationService";
import { invitedUserService } from "App/Services/InvitedUserService";
import { loggerService } from "App/Services/LoggerService";
import { InvitationTransformer } from "App/Transformers/Invitation/InvitationTransformer";
import { Helpers } from "App/Utils/helpers.util";
import InviteValidator from "App/Validators/InviteValidator";

export default class UserChatsController {
  public async sendInvite({ request }: HttpContextContract) {
    const { invited_user_emails } = await request.validate(InviteValidator);
    const { loggedInUser: host } = request;

    try {
      await invitationService.generateInvitation(invited_user_emails, host);
    } catch (e) {
      loggerService.error(`Error happened while sending invitations ====> ${e}`);
      throw new InternalServerException("Something went wrong while sending invitations!");
    }
  }

  public async verifyInvite({ params, request }: HttpContextContract) {
    const { invc: invite_code } = params;
    const { loggedInUser } = request;
    const invitation = await invitationService.findInvitationById(invite_code);
    if (invitation) {
      await invitation.load("invitedUsers");
      const invitedEmails: string[] = invitation.invitedUsers.map((invu) => invu.email);
      if (!invitedEmails.includes(loggedInUser.email)) {
        throw new BadrequestException("You are not invited through this invitation.");
      }
      let roomId = "";
      if (!invitation.room_id) {
        roomId = Helpers.generateRandomString(6, {
          includeLowerCase: true,
          includeNumbers: true,
          includeUpperCase: true,
          includeSpecialCharacters: true,
        });
        await invitationService.updateInvitationColumns(invitation, { room_id: roomId });
      } else {
        roomId = invitation.room_id;
      }
      return {
        room_id: roomId,
      };
    } else {
      throw new BadrequestException("No invitation exists for the provided invitation code.");
    }
  }

  public async getUserRooms({ request }: HttpContextContract) {
    const { loggedInUser } = request;
    const userAsInvited = await invitedUserService.findInvitedUserByColumn(
      "email",
      loggedInUser.email
    );
    let rooms: Invitation[] = [];
    if (userAsInvited) {
      await userAsInvited.load("invitations");
      rooms = userAsInvited.invitations;
    }
    const invitationsHosted: Invitation[] = await invitationService.findInvitationsByColumn(
      "host_id",
      loggedInUser.id
    );
    if (invitationsHosted.length) {
      rooms = [...rooms, ...invitationsHosted].filter((inv) => !!inv.room_id);
    }
    return {
      data: new InvitationTransformer().transformList(rooms),
    };
  }
}
