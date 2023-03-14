import UserApi from "../resources/users/api";
import React from "react";
import Input from "./Input";
import { Field, Form, Formik } from "formik";
import { UserPayload } from "../resources/users/types";

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

interface UserFormProps {
  signIn?: boolean;
}
export default function UserForm(props: UserFormProps) {
  const { signIn = false } = props;
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

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userPayload);
    try {
      if (signIn) {
        const response = await UserApi.login({ user: userPayload})
      }
      const response = await UserApi.signup({ user: userPayload });
      setUser(response);
      setUserPayload({
        id: null,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        org_name: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      className="user-form"
      id="user-form"
      onSubmit={async (e) => submitForm(e)}
    >
      {signIn
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
    </form>
  );
}
