import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";
  protected column1 = "user_name";
  protected column2 = "profile_image_url";
  protected column3 = "is_verified";
  protected column4 = "phone";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string(this.column4).nullable();
      table.boolean(this.column3).defaultTo(false).notNullable();
      table.string(this.column2, 255).nullable();
      table.string(this.column1).notNullable();
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumns(...[this.column1, this.column2, this.column3, this.column4]);
    });
  }
}
