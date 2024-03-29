import { ApiCaller } from "../helpers";
import { SessionPayload } from "./types";

export default class SessionApi extends ApiCaller {
  static path = "sessions";
  static login = async (user: Partial<SessionPayload>) => {
    const result = await ApiCaller.makeRequest("sessions", "POST", user);
    return result;
  };

  static loggedIn = async () => {
    const result = await ApiCaller.makeRequest("logged_in", "GET");
    return result as boolean;
  };

  static logout = async () => {
    const result = await ApiCaller.makeRequest("sessions", "DELETE");
    return result;
  };
}
