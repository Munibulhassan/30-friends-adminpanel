import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Adminlogin } from "../../Action/action";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const userlogin = async () => {
    const payload = {
      email: email,
      password: password,
    };
    const res = await Adminlogin(payload);

    if (res == true) {
      setloading(false);
      toast.success("Successfully Signin");

      navigate("/Loungecreate");
    } else {
      setloading(false);

      toast.error("Error Occured");
    }
  };

  return (
    <Container className="login">
      <Row>
        <Col md={4} />
        <Col md={4}>
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </Col>
        <Col md={4} />
      </Row>
      <Row>
        <Col md={4} />

        <Col md={4} className="username">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </Col>
        <Col md={4} />
      </Row>
      <Row>
        <Col md={4} />

        <Col md={4}>
          <div
            className="update"
            onClick={() => {
              setloading(true);
              userlogin();
            }}
          >
            {loading ? (
              <Rings
                height="100"
                width="100"
                color="grey"
                ariaLabel="loading"
              />
            ) : (
              <p>Login</p>
            )}
          </div>
        </Col>
        <Col md={4} />
      </Row>
    </Container>
  );
};
export default Login;
