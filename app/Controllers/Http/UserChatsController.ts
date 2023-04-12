import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BadrequestException from "App/Exceptions/BadrequestException";
import InternalServerException from "App/Exceptions/InternalServerException";
import { invitationService } from "App/Services/InvitationService";
import { loggerService } from "App/Services/LoggerService";
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
      const roomId = Helpers.generateRandomString(6, {
        includeLowerCase: true,
        includeNumbers: true,
        includeUpperCase: true,
        includeSpecialCharacters: true,
      });
      await invitationService.updateInvitationColumns(invitation, { room_id: roomId });
      return {
        room_id: roomId,
      };
    } else {
      throw new BadrequestException("No invitation exists for the provided invitation code.");
    }
  }
}
