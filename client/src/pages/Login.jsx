import Header from "../components/header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:3001/login', {
        email: email,
        password: password
      })
      .then(result => {
  const message = result.data;

  if (message === "Successfully Logged in") {
    alert("Login Successful!");
    navigate('/home');
  } 
  else if (message === "User not found") {
    alert("User not found");
  }
  else if (message === "Incorrect Email or Password") {
    alert("Incorrect Email or Password");
  }
})
.catch(err => console.log(err));
    }
    return (
      <>
        <Header />
  
  <form 
    className="login-container"
    onSubmit={handleSubmit}
  >
    <h2 id="log">Login to your account</h2>
  
    <input
      type="email"
      id="mail"
      placeholder="Enter your email"
      onChange={(e) => setEmail(e.target.value)}
    />
  
    <input
      type="password"
      id="pass"
      placeholder="Enter your password"
      onChange={(e) => setPassword(e.target.value)}
    />
  
    <button id="login" type="submit">Login</button>
  </form>
  
  <h3 className="signup-text">
    Don’t have an account?{" "}
    <Link to="/signup" id="sign-link">
      Sign Up
    </Link>
  </h3>
  
      </>
    );
}
