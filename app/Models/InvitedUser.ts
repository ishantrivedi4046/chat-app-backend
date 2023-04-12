import { DateTime } from "luxon";
import { BaseModel, column, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import Invitation from "./Invitation";

export default class InvitedUser extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

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
}
