import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import app from "../Firebase/firebase.init";

const auth = getAuth(app);

const ForgotPassword = () => {
  const [msg, setMsg] = useState("");
  const handleResetPassword = (event) => {
    setMsg("");
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        setMsg("Please Check Your Mail. Link has been sent to your email.");
      })
      .catch((err) => setMsg(err.message));
  };

  return (
    <div className="app w-50 mx-auto">
      <h1 className="text-center text-warning">Submit Your Email Here....</h1>
      <p className="text-info">{msg}</p>
      <Form onSubmit={handleResetPassword}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
