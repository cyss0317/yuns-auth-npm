import UserApi from "../resources/users/api";
import React from "react";
import Input from "./Input";
import SessionApi from "../resources/sessions/api";
import Buttons from "../layouts/Buttons";

const registerInputs = [
  { name: "first_name", displayName: "First Name:" },
  { name: "last_name", displayName: "Last Name:" },
  { name: "email", displayName: "Email:" },
  { name: "password", displayName: "Password:", type: "password" },
  {
    name: "password_confirmation",
    displayName: "Password Confirmation:",
    type: "password",
  },
  { name: "org_name", displayName: "Organization Name:" },
];
const signInInputs = [
  { name: "email", displayName: "Email:" },
  { name: "password", displayName: "Password:", type: "password" },
  { name: "org_name", displayName: "Organization Name:" },
];

export type FormType = "signIn" | "loggedIn" | "signUp";
interface UserFormProps {
  formType: FormType;
}

export default function UserForm(props: UserFormProps) {
  const { formType } = props;
  const [userPayload, setUserPayload] = React.useState<any>({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    org_name: "",
  });
  const [user, setUser] = React.useState<any>(null);
  console.log(user);

  const submitForm = async (
    e: React.FormEvent,
    formType: "signIn" | "loggedIn" | "signUp"
  ) => {
    e.preventDefault();

    switch (formType) {
      case "signIn":
        let signInResponse = await SessionApi.login({
          user: {
            email: userPayload.email,
            password: userPayload.password,
            org_name: userPayload.org_name,
          },
        });
        setUser(signInResponse);
        return;
        break;
      case "signUp":
        let signUpResponse = await UserApi.signup({ user: userPayload });
        setUser(signUpResponse);
      case "loggedIn":
        let loggedInResponse = await SessionApi.loggedIn();
        setUser(loggedInResponse);
      default:
        console.log("error");
        break;
    }
  };

  return (
    <form
      className="user-form"
      id="user-form"
      onSubmit={(e) => submitForm(e, formType)}
    >
      {formType === "signIn"
        ? signInInputs.map((input, i) => (
            <Input
              key={`${input.name}-${i}`}
              name={input.name}
              displayName={input.displayName}
              type={input.type}
              value={userPayload}
              onChange={setUserPayload}
            />
          ))
        : registerInputs.map((input, i) => (
            <Input
              key={`${input.name}-${i}`}
              name={input.name}
              displayName={input.displayName}
              type={input.type}
              value={userPayload}
              onChange={setUserPayload}
            />
          ))}
      <Buttons formType={formType} />
    </form>
  );
}
