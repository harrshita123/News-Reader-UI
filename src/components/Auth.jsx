function Auth() {
  return (
    <div className="auth-container">
      <h2 id="log">Login to your account</h2>
      <input type="email" id="mail" placeholder="Enter your email" />
      <input type="password" id="pass" placeholder="Enter your password" />
      <button id="login">Login</button>
    </div>
  );
}

export default Auth;