function Auth() {
  return (
    <div className="auth-container">
      <button id="google">
        <img
    src="src/assets/google.png"
    alt="Google logo"
    id = "google-logo"
  />Continue with Google</button>
      <div class="line-or">OR</div>
      <button id="mail">Continue with Email</button>
    </div>
  );
}

export default Auth;