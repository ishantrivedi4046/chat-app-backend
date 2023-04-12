import { InvitationDTO } from "App/Models/DTOs/invitationCreate.dto";
import Invitation from "App/Models/Invitation";
import User from "App/Models/User";
import Env from "@ioc:Adonis/Core/Env";
import { forEach } from "lodash";
import { notificationService } from "./NotificationService";
import { MailDataRequired } from "@sendgrid/mail";
import { invitedUserService } from "./InvitedUserService";

class InvitationService {
  public static getInstance() {
    return new InvitationService();
  }
  public async createInvitation(invitationPayload: InvitationDTO): Promise<Invitation> {
    return await Invitation.create(invitationPayload);
  }

  public async findInvitationById(id: string): Promise<Invitation | null> {
    return await Invitation.find(id);
  }

  public async findInvitationsByColumn(
    column: string,
    value: string | boolean | number
  ): Promise<Invitation[]> {
    return await Invitation.query().where(column, value);
  }

  public generateInvitaionLink(invitation_code: string) {
    return `${Env.get("BASE_URL")}?invite_code=${invitation_code}`;
  }

  public async generateInvitation(invitedUserEmails: string[], host: User): Promise<void> {
    /** Sending invitation to each invited user */
    const newInvitation: Invitation = await this.createInvitation({ host_id: host.id });
    const invitationLink = this.generateInvitaionLink(newInvitation.id);
    forEach(invitedUserEmails, async (email) => {
      /** entering unique invited users in the table */
      const invitedUser = await invitedUserService.createInvitedUser({ email });
      if (invitedUser) {
        await newInvitation.related("invitedUsers").save(invitedUser);
        const message: MailDataRequired = {
          to: {
            email,
          },
          subject: "Invited to chat!",
        } as MailDataRequired;
        await notificationService.sendInvitation(invitationLink, host.user_name, message);
      }
    });
  }

  public async updateInvitationColumns(
    invitation: Invitation,
    updatePayload: Record<string, string>
  ): Promise<Invitation> {
    return await invitation.merge(updatePayload).save();
  }
}

export const invitationService = InvitationService.getInstance();
