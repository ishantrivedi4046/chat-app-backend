import { DateTime } from "luxon";
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import Invitation from "./Invitation";
import { uuid } from "uuidv4";

export default class InvitedUser extends BaseModel {
  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Invitation, {
    pivotForeignKey: "invited_user_id",
    pivotRelatedForeignKey: "invitation_id",
    pivotTimestamps: true,
    pivotTable: "invitations_users",
  })
  public invitations: ManyToMany<typeof Invitation>;

  @beforeCreate()
  public static assignUUID(invitedUser: InvitedUser) {
    invitedUser.id = uuid();
  }
}
