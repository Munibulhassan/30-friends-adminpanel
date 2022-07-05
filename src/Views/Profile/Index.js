import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import user_img from "../../Assets/images.png";
import camera from "../../Assets/cam.png";
import { imageURL } from "../../Action/config";
import { useEffect, useState } from "react";
import { logout, createAdmin } from "../../Action/action";
import { toast } from "react-toastify";
// const fse = require('fs-extra')
// import {useState} from "react"

// var axios = require('axios');
var FormData = require("form-data");

function Profile() {
  const [image, setImage] = useState("");
  const [payload, setpayload] = useState({
    photo: {},
    major: "",
    userName: "",
    contact: "",
    town: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    setImage(null);
  }, []);
  const navigate = useNavigate();
  const onsubmit = async () => {
    var data = new FormData();
    // const fileObject = await fse.readJson(payload.data);
    data.append("photo", payload.photo);
    data.append("userName", payload.userName);
    data.append("contact", payload.contact);
    data.append("town", payload.town);
    data.append("email", payload.email);

    data.append("major", payload.major);
    data.append("password", payload.password);
    data.append("passwordConfirm", payload.passwordConfirm);

    console.log(payload);
    const res = await createAdmin(data);
    if (res.status == "fail") {
      toast.error(res.message);
    } else if (res.data) {
      toast.success("Admin Created Successfully");
      setpayload(...payload, { photo: {} });
      setpayload(...payload, { major: "" });
      setpayload(...payload, { userName: "" });
      setpayload(...payload, { contact: "" });
      setpayload(...payload, { town: "" });
      setpayload(...payload, { email: "" });
      setpayload(...payload, { password: "" });
      setpayload(...payload, { passwordConfirm: "" });
    } else {
      toast.error("Error Occured");
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col md={5}>
              <div className="board">
                <div className="welcom-desc">
                  <h5>Welcome Back,</h5>
                  <h6>{user?.username}</h6>
                </div>
                <div className="welcome-para">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    nec est enim. Nullam nulla est, vulputate vel elit ut.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="profile-card">
                <Row>
                  <Col md={4}>
                    <div className="profile-img">
                      {image ? (
                        <img src={image} alt="img" />
                      ) : (
                        <img src={user_img} alt="user_img" />
                      )}

                      <div className="img-importer">
                        <label htmlFor="upload-button">
                          <img src={camera} alt="icon" />
                        </label>
                      </div>
                      <input
                        type="file"
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          setImage(URL.createObjectURL(e.target.files[0]));
                          setpayload({ ...payload, photo: e.target.files[0] });
                        }}
                      />
                    </div>
                    <div className="user-info">
                      <h6>(Admin)</h6>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="profile-input">
                      <Row>
                        <Col md={12}>
                          <div className="profile-field">
                            <label>Email Address</label>
                            <InputGroup className="mb-3">
                              <Form.Control
                                placeholder="Your email address"
                                type="text"
                                value={payload.email}
                                onChange={(e) => {
                                  setpayload({
                                    ...payload,
                                    email: e.target.value,
                                  });
                                }}
                              />
                              {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="profile-field">
                            <label>Username</label>
                            <InputGroup className="mb-3">
                              <Form.Control
                                placeholder="Your username"
                                type="text"
                                value={payload.userName}
                                onChange={(e) => {
                                  setpayload({
                                    ...payload,
                                    userName: e.target.value,
                                  });
                                }}
                                // onChange={(e)=>{setUserdata(...payloadTransfer,{userName:e.target.value})}}
                              />
                              {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
                            </InputGroup>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="profile-field">
                            <label>Major</label>
                            <InputGroup className="mb-3">
                              <Form.Control
                                placeholder="Major"
                                type="text"
                                value={payload.major}
                                onChange={(e) => {
                                  setpayload({
                                    ...payload,
                                    major: e.target.value,
                                  });
                                }}
                                // onChange={(e)=>{setUserdata(...payloadTransfer,{userName:e.target.value})}}
                              />
                              {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="profile-field">
                            <label>Phone No.</label>
                            <InputGroup className="mb-3">
                              <Form.Control
                                placeholder="Your username"
                                type="text"
                                value={payload.contact}
                                onChange={(e) => {
                                  setpayload({
                                    ...payload,
                                    contact: e.target.value,
                                  });
                                }}
                              />
                              {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
                            </InputGroup>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="profile-field">
                            <label>Address</label>
                            <InputGroup className="mb-3">
                              <Form.Control
                                placeholder="Your address"
                                type="text"
                                onChange={(e) => {
                                  setpayload({
                                    ...payload,
                                    town: e.target.value,
                                  });
                                }}
                              />
                              {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <div className="profile-field">
                            <label>Password </label>
                            <InputGroup className="mb-3">
                              <Form.Control
                                placeholder="Password"
                                type="text"
                                value={payload.password}
                                onChange={(e) => {
                                  setpayload({
                                    ...payload,
                                    password: e.target.value,
                                  });
                                }}
                              />
                              {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
                            </InputGroup>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="profile-field">
                            <label>Confirm Password</label>
                            <InputGroup className="mb-3">
                              <Form.Control
                                placeholder="Confirm Password"
                                type="text"
                                value={payload.passwordConfirm}
                                onChange={(e) => {
                                  setpayload({
                                    ...payload,
                                    passwordConfirm: e.target.value,
                                  });
                                }}
                              />
                              {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={12}>
              <div className="create-admin">
                <p
                  onClick={() => {
                    onsubmit();
                  }}
                >
                  Create Admin
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default Profile;
