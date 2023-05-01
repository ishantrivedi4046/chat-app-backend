import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import InvitedUser from "./InvitedUser";
import { uuid } from "uuidv4";

export default class Invitation extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public host_id: number;

  @column()
  public room_id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUUID(invitation: Invitation) {
    invitation.id = uuid();
  }

  @manyToMany(() => InvitedUser, {
    pivotForeignKey: "invitation_id",
    pivotRelatedForeignKey: "invited_user_id",
    pivotTimestamps: true,
    pivotTable: "invitations_users",
  })
  public invitedUsers: ManyToMany<typeof InvitedUser>;
}
