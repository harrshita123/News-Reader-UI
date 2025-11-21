import Header from "../components/header.jsx";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <Header />
      <div className="signup-container">
        <h2 id="sig">Create your account</h2>
        <input type="email" id="mail" placeholder="Enter your email" />
        <input type="password" id="pass" placeholder="Enter your password" />
        <input type="password" id="c-pass" placeholder="Confirm password" />
        <button id="sign">Sign Up</button>
      </div>
      <h3 className="log-text">
  Already have an account?{" "}
  <Link to="/" className="text-blue-600 underline">
    Login
  </Link>
</h3>
    </>
  );
}
