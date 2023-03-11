import User from "../resources/users/api";

function Test() {
  
  const user = {
    first_name: "test",
    last_name: "world",
    email: "testFrom@react.com",
    password: "asdfasdf",
    password_confirmation: "asdfasdf",
    org_name: "test",
  }
  return (
    <div>
      <h1>Test</h1>
      <button onClick={() => User.signup({user})} >button</button>
    </div>
  );
}

export default Test;
