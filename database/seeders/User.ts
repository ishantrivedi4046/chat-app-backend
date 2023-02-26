import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class extends BaseSeeder {
  public async run() {
    const users = [
      {
        first_name: "Test",
        last_name: "User 1",
        email: "test1@gmail.com",
        password: "secret",
      },
      {
        first_name: "Test",
        last_name: "User 2",
        email: "test2@gmail.com",
        password: "secret",
      },
    ];

    await User.createMany(users);
  }
}
