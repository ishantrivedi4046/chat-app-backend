import { UserCreateDTO } from "App/Models/DTOs/userCreate.dto";
import User from "App/Models/User";

class UserService {
  public static getInstance() {
    return new UserService();
  }

  public async creatUser(userData: UserCreateDTO): Promise<User | null> {
    return await User.create(userData);
  }

  public async findById(value: number): Promise<User | null> {
    return await User.query().where("id", value).first();
  }

  public async findByUserColumn(column: string, value: string): Promise<User | null> {
    return await User.query().where(column, value).first();
  }

  public async updateUserColumns(
    user: User,
    updatePayload: Record<string, string | boolean>
  ): Promise<User> {
    return await user.merge(updatePayload).save();
  }
}
export const userService = UserService.getInstance();
