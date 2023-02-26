import User from "App/Models/User";

class UserService {
  public static getInstance() {
    return new UserService();
  }

  public async findById(value: number): Promise<User | null> {
    return await User.query().where("id", value).first();
  }

  public async findByEmail(value: string): Promise<User | null> {
    return await User.query().where("email", value).first();
  }
}
export const userService = UserService.getInstance();
