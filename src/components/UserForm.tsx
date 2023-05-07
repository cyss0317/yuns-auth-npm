import UserApi from "../resources/users/api";
import React from "react";
import Input from "./Input";
import SessionApi from "../resources/sessions/api";
import Buttons from "../layouts/Buttons";
import config from "../config";

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

interface Payload {
  [key: string]: string | null;
}

export default function UserForm(props: UserFormProps) {
  const { formType } = props;
  const [userPayload, setUserPayload] = React.useState<Payload>({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    org_name: "",
  });
  const [fieldErrors, setFieldErrors] = React.useState<Payload>({
    first_name: "",
    last_name: "",
    email: "123",
    password: "afsdf",
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
    try {
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
        default:
          console.log("error");
          break;
      }
    } catch (err) {
      console.log({ err });
    }
  };

  if (user?.logged_in) {
    return (
      <p>Successfully logged in</p>
    )
  }

  return (
    <div>
      <form
        id="user-form"
        className="user-form"
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
                fieldErrors={fieldErrors}
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
                fieldErrors={fieldErrors}
              />
            ))}
        <Buttons formType={formType} />
        {/* <a
          href="http://localhost:5173"
          onClick={() => window.open(`${config.BASE_URL}`, 'newwindow', 'width=500, height=400')}
          // target="_blank"
        >
          Click
        </a> */}
      </form>
    </div>
  );
}
