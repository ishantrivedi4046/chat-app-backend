import { InvitedUserCreateDTO } from "App/Models/DTOs/InvitedUserCreate.dto";
import InvitedUser from "App/Models/InvitedUser";

class InvitedUserService {
  public static getInstance() {
    return new InvitedUserService();
  }

  public async createInvitedUser(invitedUserPayload: InvitedUserCreateDTO): Promise<InvitedUser> {
    return await InvitedUser.firstOrCreate(invitedUserPayload);
  }

  public async findInvitedUserByColumn(column: string, value: string) {
    return await InvitedUser.query().where(column, value).first();
  }
}

export const invitedUserService = InvitedUserService.getInstance();
