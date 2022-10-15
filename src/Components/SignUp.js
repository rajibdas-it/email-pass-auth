import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import app from "../Firebase/firebase.init";

const auth = getAuth(app);

const SignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSignUp = (event) => {
    setSuccess(false);
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Please provide at least one uppercase");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("Please provide at least one special character");
      return;
    }
    if (password.length < 6) {
      setError("password should be at least 6 characters");
      return;
    }
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setSuccess(true);
        form.reset();
        verifyEmail();
      })
      .catch((error) => setError(error.message));
  };
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser);
  };
  return (
    <div className="app w-50 mx-auto">
      <h1 className="text-center text-warning">Please Sign Up Here....</h1>
      {success && (
        <p className="text-success fw-bold text-center">
          User Created Successfully. Please check you email for validation.
        </p>
      )}
      <Form onSubmit={handleSignUp}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <p className="text-danger">{error}</p>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <p>
        <small>
          Already have an account? <Link to="/signin">Please Login</Link>
        </small>
      </p>
    </div>
  );
};

export default SignUp;
