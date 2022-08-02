import {
  Container,
  Row,
  Col,
  Table,
  Modal,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import user_img from "../../Assets/images.png";
import camera from "../../Assets/cam.png";
import user_icon1 from "../../Assets/User-icon1.png";
import { getAlluser, updateUserStatus } from "../../Action/action";


import { useEffect, useState } from "react";
import { createAdmin } from "../../Action/action";
import { toast } from "react-toastify";
// const fse = require('fs-extra')
// import {useState} from "react"

// var axios = require('axios');
var FormData = require("form-data");

function Profile() {
  const [image, setImage] = useState("");
  const [status, setstatus] = useState("active");

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    setImage(null);
  }, []);

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

    const res = await createAdmin(data);
    console.log(res);
    if (res.status === "fail") {
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
      toast.error(res);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const handleClose = () => setShow(false);
  const [data, setdata] = useState([]);

  const [page, setpage] = useState(1);
  const [count, setcount] = useState([]);

  const getusers = async () => {
    const res = await getAlluser(status, page);
    var arr = [];
    var count = 0;
    console.log(res)
    if (parseInt(res.results / 10) * 10 == res.results) {
      count = res.results / 10;
    } else {
      count = parseInt(res.results / 10) + 1;
    }

    for (var i = 1; i <= count; i++) {
      arr.push(i);
    }
    setcount(arr);
    setdata(res.data);
    // setuserdata(res.splice(((page-1)*10)+1,10))
    // setrange( parseInt(res.length/10)+1)
    // for (var i = 0; i < parseInt(res.length / 10) + 1; i++) {
    //   pagination.push(i + 1);
    // }
    // setrange(pagination)
  };
  // useEffect(()=>{
  //   setuserdata(data.splice(((page-1)*10)+1,10))

  // },[page])

  useEffect(() => {
    getusers();
  }, [status, page]);

  const userStatusUpdate = async (id, status) => {
    const payload = {
      user: id,
      status: status,
    };

    const res = await updateUserStatus(payload);
    getusers();
    if (res?.error) {
      toast.error("Error Occured");
    } else {
      toast.success("User status Update Successfully");
    }
  };
  return (
    <div className="App icebreaker-sec users-sec">
      <header className="App-header">
        <Container>
          <Row>
            <Col md={5} className="profile-header">
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
              <div className="disable">
                <span>
                  <p
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    Create
                  </p>
                </span>
              </div>
            </Col>

            <Col md={8}></Col>
            <Col md={4}>
              <Form.Select
                aria-label="Event Type"
                onChange={(e) => {
                  setstatus(e.target.value);
                }}
                style={{ "margin-bottom": "20px" }}
              >
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </Form.Select>
            </Col>
            <Table striped bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr>
                    <td>
                      {index + ((page - 1) * 10 + 1) > 9
                        ? index + ((page - 1) * 10 + 1)
                        : "0" + (index + ((page - 1) * 10 + 1))}
                    </td>
                    <td>
                      <div className="user-inform">
                        <span>
                          <img src={user_icon1} alt="user" />
                        </span>{" "}
                        <span>
                          <h6>{item?.userName}</h6>
                        </span>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>
                      {item.active == "active" ? (
                        <div className="disable">
                          <span>
                            <p
                              onClick={() => {
                                userStatusUpdate(item._id, false);
                              }}
                            >
                              disable
                            </p>
                          </span>

                          {/* <Link to={"/"}>disable</Link> */}
                        </div>
                      ) : (
                        <div className="enable">
                          <span>
                            <p
                              onClick={() => {
                                userStatusUpdate(item._id, true);
                              }}
                            >
                              enable
                            </p>
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="page-changer">
            <div className="arrow-prev">
              <Button
                type="button"
                onClick={() => {
                  var i = count.indexOf(page);
                  if (i - 1 != -1) {
                    setpage(page - 1);
                  }
                }}
              >
                <i class="fa-solid fa-square-caret-left" />
                {/* <FontAwesomeIcon icon={solid("caret-left")} /> */}
              </Button>
            </div>
            {count.map((item) => {
              if (page === item) {
                return (
                  <p
                    className="active"
                    onClick={() => {
                      setpage(item);
                    }}
                  >
                    {item}
                  </p>
                );
              } else {
                return (
                  <p
                    onClick={() => {
                      setpage(item);
                    }}
                  >
                    {item}
                  </p>
                );
              }
            })}

            <div className="arrow-prev">
              <Button
                type="button"
                onClick={() => {
                  var i = count.indexOf(page);
                  if (i + 1 > !count.length - 1) {
                    setpage(page + 1);
                  }
                }}
              >
                <i class="fa-solid fa-square-caret-right" />
                {/* <FontAwesomeIcon icon={solid("caret-right")} /> */}
              </Button>
            </div>
          </div>
          </Row>
        </Container>
      </header>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        size="md"
        className="main-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
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
                            setpayload({
                              ...payload,
                              photo: e.target.files[0],
                            });
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
                                />
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
                                />
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
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
