import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import app from "../Firebase/firebase.init";

const auth = getAuth(app);

const UpdateProfile = () => {
  const [msg, setMsg] = useState("");
  const handleUpdateProfile = (event) => {
    setMsg("");
    event.preventDefault();
    const form = event.target;
    const fName = form.fname.value;
    const lName = form.lname.value;
    const address = form.address.value;
    const imgUrl = form.imgurl.value;
    const fullName = fName + " " + lName;
    // console.log("btn clicked");
    updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: imgUrl,
      address: address,
    })
      .then(() => {
        setMsg("Profile Updated Successfully");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="app w-50 mx-auto">
      <h1 className="text-center text-info">
        Update your personal information....
      </h1>
      <p className="text-success">{msg}</p>

      <Form onSubmit={handleUpdateProfile}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="fname"
            placeholder="Enter First Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lname"
            placeholder="Enter Last Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows={3} name="address" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            name="imgurl"
            placeholder="Enter First Name"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;
