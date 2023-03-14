export default function Footer() {
  return (
    <div className="button-group">
      <button className="button" form="user-form" type="submit">
        Register
      </button>
      <button className="button" type="button">
        <a href="/login">Sign In</a>
      </button>
    </div>
  );
}
