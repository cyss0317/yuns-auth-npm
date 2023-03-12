import config from "../../config";

// import config from "src/config.";
export function makeHeaders() {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  return headers;
}

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export function makeOptions(method: Method, body?: object) {
  const options = {
    method,
    headers: makeHeaders(),
    body: JSON.stringify(body),
  };
  return options;
}

export class ApiCaller {
  static baseUrl = `${config.BASE_URL}/api`;

  static makeRequest = async (
    path: "users" | "organizations",
    method: Method,
    body?: object,
    wildCard?: number
  ) => {
    let endpoint = `${this.baseUrl}/${path}`;
    if (!!wildCard) {
      endpoint += `/${wildCard}`;
    }
    const options = makeOptions(method, body);

    try {
      const response = await fetch(endpoint, options);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.log(err);
    }
  };
}
