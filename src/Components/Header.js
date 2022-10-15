import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/signin">Login</Link>
      <Link to="/signup">Register</Link>
    </nav>
  );
};

export default Header;
