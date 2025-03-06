export default function LoginSignup() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h3>Login or Signup</h3>
        <label>Email</label>
        <input type="text" placeholder="Email"></input>
        {/* <label >Password</label>
        <input type="password" placeholder="Password"></input> */}
        <button className="continue-button">Continue</button>
      </form>
    </div>
  );
}
