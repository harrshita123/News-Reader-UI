import { Link } from "react-router-dom";

function Footer() {
  return (
    <h3 className="signup-text">
      Don’t have an account? <Link to="/signup">Sign up</Link>
    </h3>
  );
}

export default Footer;