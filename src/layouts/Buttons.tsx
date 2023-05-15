interface FooterProps {
  formType: "signIn" | "loggedIn" | "signUp";
}

const formTypeTitle = {
  signIn: "Sign Up",
  signUp: "Sign In",
  loggedIn: "Logged In",
};

export default function Buttons(props: FooterProps) {
  const { formType } = props;
  console.log(formType);
  return (
    <div className="button-group">
      {/* < Button formType="signup" />  */}
      <button
        className="button"
        form="user-form"
        type={formType !== "signUp" ? "button" : "submit"}
      >
        {formType !== "signUp" ? (
          <a href="/signup">{formTypeTitle[formType]}</a>
        ) : (
          "Register"
        )}
      </button>
      <button
        className="button"
        form="user-form"
        type={formType !== "signIn" ? "button" : "submit"}
      >
        {formType !== "signIn" ? (
          <a href="/">{formTypeTitle[formType]}</a>
        ) : (
          "Sign In"
        )}
      </button>
    </div>
  );
}
