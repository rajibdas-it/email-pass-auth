import React, { useState } from "react";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../Firebase/firebase.init";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const SignIn = () => {
  const [user, setUser] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setErrorMsg("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((err) => setErrorMsg(err.message));
  };

  // const verifyEmail = () => {
  //   sendEmailVerification(auth.currentUser);
  // };
  return (
    <div className="app w-50 mx-auto">
      <h1 className="text-center text-warning">Please Sign In Here....</h1>
      <p className="text-center text-danger">{errorMsg}</p>

      <Form onSubmit={handleSignIn}>
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
        <p className="text-danger"></p>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      <p>
        <small>
          New to this website? <Link to="/signup">Please Register</Link>
        </small>
      </p>
      <p>
        <small>
          <Link to="/reset-password">Forgot Password?</Link>
        </small>
      </p>
      <div>
        {user.emailVerified && (
          <div>
            {user.uid && (
              <div>
                <h3>
                  User Name:{" "}
                  {user.displayName ? user.displayName : "No Name Found"}
                </h3>
                <p>Email: {user.email}</p>

                <p>
                  Photo:{" "}
                  <img
                    className="fluid w-25 h-25 roundedCircle"
                    src={user.photoURL}
                    alt=""
                  />
                </p>
                <Link to="/profile-update">Update Profile</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
