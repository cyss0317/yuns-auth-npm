import React, { useState, useMemo } from "react";
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

interface Errors {
  [key: string]: string | Array<string>;
}

const registerInputs = [
  { name: "first_name", displayName: "First Name:" },
  { name: "last_name", displayName: "Last Name:" },
  { name: "email", displayName: "Email:", type: "email" },
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
  const [fieldErrors, setFieldErrors] = useState<Errors>({
    first_name: "",
    last_name: "",
    email: "123",
    password: "afsdf",
    password_confirmation: "",
    org_name: "124",
  });
  const [user, setUser] = useState<any>(null);

  const isSessionAlive = useMemo(async () => {
    const session = await SessionApi.loggedIn();
    return await session;
  }, [user?.id]);
  console.log("isSessionAlive", isSessionAlive);
  if (user?.logged_in) {
    return <p>Successfully logged in</p>;
  }

  const validator = (): boolean => {
    let validated = true;
    const emailValidator = (): void => {
      const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const isValidated = pattern.test(userPayload.email);
      if (!isValidated) {
        setFieldErrors((prev) => ({ ...prev, email: "Email is not correct" }));
        validated = false;
      }
    };

    const passwordValidator = (): void => {
      const includesDigit = /^(?=.*\d)/;
      const includesCapitalLetter = /(?=.*[A-Z])/;
      const lengthValidator = /(?=.*[a-zA-Z]).{8,}$/;

      if (!includesDigit.test(userPayload.password)) {
        setFieldErrors((prev) => ({
          ...prev,
          pssaword: [...prev.password, "Must includes at least 1 number"],
        }));
        validated = false;
      }
      if (!includesCapitalLetter.test(userPayload.password)) {
        setFieldErrors((prev) => ({
          ...prev,
          pssaword: [
            ...prev.password,
            "Must includes at least 1 capital letter",
          ],
        }));
        validated = false;
      }
      if (!lengthValidator.test(userPayload.password)) {
        setFieldErrors((prev) => ({
          ...prev,
          pssaword: [...prev.password, "Must be longer than 8 characters"],
        }));
        validated = false;
      }
      if (userPayload.passwrod === userPayload.password_confirmation) {
        setFieldErrors((prev) => ({
          ...prev,
          pssaword: [...prev.password, "Passwords have to match"],
        }));
        validated = false;
      }
    };

    emailValidator();
    passwordValidator();

    return validated;
  };

  const submitForm = async (e: React.FormEvent, formType: FormType) => {
    e.preventDefault();
    // check the validation and only submit the form if all passed
    if (validator()) {
      return;
    }
    try {
      switch (formType) {
        case FormType.SignIn:
          try {
            let signInResponse = await SessionApi.login({
              user: {
                email: userPayload.email || "",
                password: userPayload.password || "",
                org_name: userPayload.org_name || "",
              },
            });
            setUser(signInResponse);
            sessionStorage.setItem(signInResponse.id, "true");
            window.USER = signInResponse;
          } catch (err) {
            console.log({ err });
          }
          break;
        case FormType.SignUp:
          let signUpResponse = await UserApi.signup({ user: userPayload });
          let user = {
            ...signUpResponse,
            user: { ...signUpResponse.user, loggedIn: true },
          };
          setUser(user);
          sessionStorage.setItem(user.id, "true");
          window.USER = user;
          break;
        default:
          console.log("error");
          break;
      }
    } catch (err) {
      console.log({ err });
    }
  };

  console.log(userPayload);
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
            color="#716af7"
            key={`${input.name}-${i}`}
            name={input.name}
            displayName={input.displayName}
            type={input.type}
            value={userPayload[input.name]}
            onChange={(e: { target: { value: any } }) =>
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
