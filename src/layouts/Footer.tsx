export default function Footer() {
  return (
    <div className="button-group">
      <button className="button" form="user-form" type="submit">
        Register
      </button>
      <button className="button" form="user-form" type="submit">
        {/* <a href="/login">Sign In</a> */}
        Sign In
      </button>
      <button type="submit" className="button" form="user-form">LoggedIn?</button>
    </div>
  );
}
