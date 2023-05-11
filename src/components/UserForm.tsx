import React, { useState } from "react";
import UserApi from "../resources/users/api";
import SessionApi from "../resources/sessions/api";
import Buttons from "../layouts/Buttons";
import { Input } from "simple-input-comp";
import config from "../config";

enum FormType {
  SignIn = "signIn",
  LoggedIn = "loggedIn",
  SignUp = "signUp",
}

interface UserFormProps {
  formType: FormType;
}

interface Payload {
  [key: string]: string | null;
}

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

export default function UserForm(props: UserFormProps) {
  const { formType } = props;
  const [userPayload, setUserPayload] = useState<Payload>({
    id: null,
    first_name: "",
    last_name: "",
    email: "5555",
    password: "",
    password_confirmation: "",
    org_name: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Payload>({
    first_name: "",
    last_name: "",
    email: "123",
    password: "afsdf",
    password_confirmation: "",
    org_name: "",
  });
  const [user, setUser] = useState<any>(null);

  const submitForm = async (e: React.FormEvent, formType: FormType) => {
    e.preventDefault();
    try {
      switch (formType) {
        case FormType.SignIn:
          let signInResponse = await SessionApi.login({
            user: {
              email: userPayload.email,
              password: userPayload.password,
              org_name: userPayload.org_name,
            },
          });
          setUser(signInResponse);
          break;
        case FormType.SignUp:
          let signUpResponse = await UserApi.signup({ user: userPayload });
          setUser(signUpResponse);
          break;
        default:
          console.log("error");
          break;
      }
    } catch (err) {
      console.log({ err });
    }
  };

  if (user?.logged_in) {
    return <p>Successfully logged in</p>;
  }
  console.log(userPayload)
  const inputList =
    formType === FormType.SignIn ? signInInputs : registerInputs;

  return (
    <div>
      <form
        id="user-form"
        className="user-form"
        onSubmit={(e) => submitForm(e, formType)}
      >
        {inputList.map((input, i) => (
          <Input
            key={`${input.name}-${i}`}
            name={input.name}
            displayName={input.displayName}
            type={input.type}
            value={userPayload[input.name]}
            onChange={(e) =>
              setUserPayload({ ...userPayload, [input.name]: e.target.value })
            }
            errorMessage={fieldErrors[input.name]}
            resetErrorMessage={() =>
              setFieldErrors({ ...fieldErrors, [input.name]: "" })
            }
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
