import { ApiCaller } from "../helpers/index";
import { UserType } from "./types";

class User extends ApiCaller {
  static path = "users";

  static signup = async (user: UserType) => {
    const result = await ApiCaller.makeRequest("users", "POST", user);
    return result;
  };

  static update = async (user: Partial<UserType>) => {
    const result = await ApiCaller.makeRequest("users", "PATCH", user);
    return result;
  };
}
