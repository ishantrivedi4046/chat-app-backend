import { DateTime } from "luxon";
import { BaseModel, column, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import InvitedUser from "./InvitedUser";

export default class Invitation extends BaseModel {
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

  @manyToMany(() => InvitedUser, {
    pivotForeignKey: "invitation_id",
    pivotRelatedForeignKey: "invited_user_id",
    pivotTimestamps: true,
    pivotTable: "invitations_users",
  })
  public invitedUsers: ManyToMany<typeof InvitedUser>;
}
