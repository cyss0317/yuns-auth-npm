import { ApiCaller } from "../helpers/index";
import { UserId, UserType, UserPayload } from "./types";

export default class User extends ApiCaller {
  static path = "users";

  static signup = async (user: Partial<UserPayload>) => {
    const result = await ApiCaller.makeRequest("users", "POST", user);
    return result;
  };

  static update = async (user: Partial<UserPayload>) => {
    const result = await ApiCaller.makeRequest("users", "PATCH", user);
    return result;
  };

  // static delete = async (userId: UserId) => {
  //   const result = await APICaller.makeRequest("users", "DELETE", )
  // }
}
