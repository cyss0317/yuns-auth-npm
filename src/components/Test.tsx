import UserApi from "../resources/users/api";
import React from "react";
import { Field, Form, Formik } from "formik";
import { UserPayload } from "../resources/users/types";

function Test() {
  const [user, setUser] = React.useState<any>({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    org_name: "",
  });

  return (
    <div>
      {/* <Formik initialValues={formikInitialValues}
       onSubmit={async (values) => {
          const response = await UserApi.signup(values);
          console.log(response);
       }} 
      > */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(user);
          try {
            UserApi.signup({ user });
            setUser({
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
        }}
      >
        <label htmlFor="first_name">First Name:</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
        <label htmlFor="last_name">Last Name:</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email@email.com"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <label htmlFor="password_confirmation">Password Confirmation:</label>
        <input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          value={user.password_confirmation}
          onChange={(e) =>
            setUser({ ...user, password_confirmation: e.target.value })
          }
        />
        <label htmlFor="org_name">Organization Name:</label>
        <input
          id="org_name"
          name="org_name"
          type="text"
          value={user.org_name}
          onChange={(e) => setUser({ ...user, org_name: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      {/* </Formik> */}
    </div>
  );
}

export default Test;
