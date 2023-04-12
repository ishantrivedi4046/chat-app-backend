import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import InternalServerException from "App/Exceptions/InternalServerException";
import { invitationService } from "App/Services/InvitationService";
import { loggerService } from "App/Services/LoggerService";
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
}
