import UserApi from "../resources/users/api";
import React from "react";
import Input from "./Input";
import { Field, Form, Formik } from "formik";
import { UserPayload } from "../resources/users/types";

const formInputs = [
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

function Test() {
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
    <form className="user-form" onSubmit={async (e) => submitForm(e)}>
      {formInputs.map((input, i) => (
        <Input
          key={`${input.name}-${i}`}
          name={input.name}
          displayName={input.displayName}
          type={input.type}
          value={userPayload}
          onChange={setUserPayload}
        />
      ))}
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}

export default Test;
