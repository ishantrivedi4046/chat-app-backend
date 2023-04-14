import { UserCreateDTO } from "App/Models/DTOs/userCreate.dto";
import Invitation from "App/Models/Invitation";
import User from "App/Models/User";
import { invitationService } from "./InvitationService";
import { invitedUserService } from "./InvitedUserService";

class UserService {
  public static getInstance() {
    return new UserService();
  }

  public async creatUser(userData: UserCreateDTO): Promise<User | null> {
    return await User.create(userData);
  }

  public async getAllUsers() {
    return await User.all();
  }

  public async findById(value: number): Promise<User | null> {
    return await User.query().where("id", value).first();
  }

  public async findByUserColumn(column: string, value: string): Promise<User | null> {
    return await User.query().where(column, value).first();
  }

  public async getUserGroups(user: User): Promise<Invitation[]> {
    const userAsInvited = await invitedUserService.findInvitedUserByColumn("email", user.email);
    let rooms: Invitation[] = [];
    if (userAsInvited) {
      await userAsInvited.load("invitations");
      rooms = userAsInvited.invitations;
    }
    const invitationsHosted: Invitation[] = await invitationService.findInvitationsByColumn(
      "host_id",
      user.id
    );
    if (invitationsHosted.length) {
      rooms = [...rooms, ...invitationsHosted].filter((inv) => !!inv.room_id);
    }
    return rooms;
  }

  public async updateUserColumns(
    user: User,
    updatePayload: Record<string, string | boolean>
  ): Promise<User> {
    return await user.merge(updatePayload).save();
  }
}
export const userService = UserService.getInstance();
