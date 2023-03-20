import Hash from "@ioc:Adonis/Core/Hash";
import { BaseModel, beforeSave, column, computed } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public first_name: string;

  @column()
  public last_name?: string;

  @column()
  public email?: string;

  @column({ serializeAs: null })
  public password?: string;

  @column()
  public phone?: string;

  @column()
  public is_verified: boolean;

  @column()
  public profile_image_url?: string;

  @column()
  public user_name: string;

  @computed()
  public get fullName() {
    return `${this.first_name} ${this.last_name ? this.last_name : ""}`;
  }

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.password && user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
