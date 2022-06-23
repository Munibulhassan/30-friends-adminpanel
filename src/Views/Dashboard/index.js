import { Container, Row, Col, Form } from "react-bootstrap";
import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import person_1 from "../../Assets/person_1.png";
import person_2 from "../../Assets/person_2.png";
import upload from "../../Assets/upload.png";
import user_img from "../../Assets/user-img.png";
import admin_user from "../../Assets/admin_user.png";
import admin_email from "../../Assets/admin_email.png";
import admin_call from "../../Assets/admin_call.png";
import admin_location from "../../Assets/admin_location.png";
import Select from "react-select";
// import makeAnimated from "react-select/animated";
// import axios from "axios";
import { imageURL } from "../../Action/config";
import {
  createLounge,
  deleteLounge,
  getIcebreakers,
  getIntroduction,
} from "../../Action/action";
var FormData = require("form-data");
// var fs = require('fs');
function Dashboard() {
  const [ice, setice] = useState([]);
  const [intro, setintro] = useState([]);

  async function getice() {
    const data = await getIcebreakers("active");
    data.map((item, index) => {
      data[index].value = item._id;

      data[index].label = item.name;
    });
    setice(data);
  }
  async function getintro() {
    const data = await getIntroduction("active");
    data.map((item, index) => {
      data[index].value = item._id;

      data[index].label = item.text;
    });
    setintro(data);
  }
  useEffect(() => {
    getice();
    getintro();
  }, []);

  const [lougeData, setLougedata] = useState({
    name: "",
    description: "",
    eventType: "",
    eventCat: "",
    icebreakers: [],
    introductions: [],

    scheduling: {},
    chatCycle: 0,
    lobbyInterval: 0,
    participantsPerChat: 0,
    endNotificationReminder: 0,
    advertisementBanner: null,
    banner: null,
    url: "",
  });
  const [scheduling, setscheduling] = useState({
    interval: "",
    scheduleDate: "",
    startAt: "",
    endAt: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const onSubmitLouge = async () => {
    var data = new FormData();

    data.append("banner", lougeData.banner);
    data.append("advertisementBanner", lougeData.advertisementBanner);

    data.append("url", lougeData.url);

    data.append("name", lougeData.name);
    data.append("description", lougeData.description);
    data.append("eventType", lougeData.eventType);
    data.append(
      "eventCat",
      ["Daily", "Weekly", "Monthly"].includes(lougeData.eventType)
        ? "recurring"
        : "always-open"
    );
    data.append("scheduling", JSON.stringify(scheduling));
    // data.append("icebreakers", icebreaker);
    data.append("chatCycle", lougeData.chatCycle);
    data.append("lobbyInterval", lougeData.lobbyInterval);
    data.append("participantsPerChat", lougeData.participantsPerChat);
    data.append("endNotificationReminder", lougeData.endNotificationReminder);
    console.log(lougeData);
    console.log(data);

    if (["Daily", "Weekly", "Monthly"].includes(lougeData.eventType)) {
      lougeData.eventCat = "recurring";
    } else {
      lougeData.eventCat = "always-open";
    }
    lougeData.banner = JSON.stringify(lougeData.banner);
    lougeData.advertisementBanner = JSON.stringify(
      lougeData.advertisementBanner
    );

    // lougeData.icebreakers=icebreaker
    lougeData.scheduling = scheduling;

    await createLounge(lougeData);
  };
  console.log(lougeData);
  return (
    <div className="App">
      <div className="board">
        <Container>
          <Row>
            <Col md={7}>
              <div className="">
                <Row>
                  <Col md={7}>
                    <div className="welcom-desc">
                      <h5>Welcome Back,</h5>
                      <h6>{user?.userName}</h6>
                    </div>
                    <div className="welcome-para">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed nec est enim. Nullam nulla est, vulputate vel elit
                        ut.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="welcome-board import">
                <Row>
                  <Col md={12}>
                    <div className="upload-desc">
                      <label htmlFor="image-uploading">
                        {lougeData.banner ? (
                          <img
                            src={URL.createObjectURL(lougeData.banner)}
                            alt=""
                          />
                        ) : (
                          <img src={upload} alt="" />
                        )}
                        {/* <img src={upload} alt="" /> */}
                      </label>

                      <p>1200 x 1080 px recommended</p>
                      <input
                        type="file"
                        onChange={(e) => {
                          setLougedata({
                            ...lougeData,
                            banner: e.target.files[0],
                          });
                        }}
                        style={{ display: "none" }}
                        id="image-uploading"
                      />
                    </div>
                  </Col>
                </Row>
              </div>

              {/* Basic info  */}
              <div className="basic-info">
                <Row>
                  <Col md={6}>
                    <label>Basic Information</label>
                  </Col>
                  <Col md={6}>
                    {/* <div className="basic-opt">
                      <div className="custom-check">
                        <label class="container">Open Lounge
                          <input type="radio" name="radio" value="" onChange={e=>{console.log(e)}}/>
                          <span class="checkmark"></span>
                        </label>
                        <label class="container">Scheduled Event
                          <input type="radio" name="radio" />
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    </div> */}
                  </Col>
                </Row>
                <Form.Control
                  type="text"
                  placeholder="Event Name..."
                  value={lougeData.name}
                  onChange={(e) => {
                    setLougedata({ ...lougeData, name: e.target.value });
                  }}
                />
                <Form.Select
                  aria-label="Event Type"
                  onChange={(e) => {
                    setLougedata({ ...lougeData, eventType: e.target.value });
                  }}
                >
                  <option>Event Type</option>
                  <option value="permanent">Permanent</option>
                  <option value="timed">Timed</option>
                </Form.Select>
              </div>
              {/* Basic info END */}

              {/* Basic info  */}
              <div className="basic-info">
                <label>Description</label>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={8}
                    placeholder="Type Here..."
                    value={lougeData.description}
                    onChange={(e) => {
                      setLougedata({
                        ...lougeData,
                        description: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
              </div>
              {/* Basic info END */}
              {/* Basic info  */}
              <div className="basic-info">
                <label>Recurring</label>
                <div className="custom-check">
                  <label class="container">
                    Daily
                    <input
                      type="radio"
                      name="radio"
                      value="daily"
                      onChange={(e) => {
                        setscheduling({
                          ...scheduling,
                          interval: e.target.value,
                        });
                      }}
                    />
                    <span class="checkmark"></span>
                  </label>
                  {/* scheduleDate: "",
    startAt: "",
    endAt: "" */}
                  <label class="container">
                    Weekly
                    <input
                      type="radio"
                      name="radio"
                      value="weekly"
                      onChange={(e) => {
                        setscheduling({
                          ...scheduling,
                          interval: e.target.value,
                        });
                      }}
                    />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container">
                    Monthly
                    <input
                      type="radio"
                      name="radio"
                      value="monthly"
                      onChange={(e) => {
                        setscheduling({
                          ...scheduling,
                          interval: e.target.value,
                        });
                      }}
                    />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container">
                    None
                    <input
                      type="radio"
                      name="radio"
                      value="none"
                      onChange={(e) => {
                        setscheduling({
                          ...scheduling,
                          interval: e.target.value,
                        });
                      }}
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              {/* Basic info END */}

              {/* Basic info  */}
              <div className="basic-info">
                <label>Schedule Date:</label>
                <Row>
                  <Col md={4}>
                    <label className="date-pick">Event Date:</label>

                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        setscheduling({
                          ...scheduling,
                          scheduleDate: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <label className="date-pick">Starts at:</label>
                    <input
                      type="time"
                      class="form-control"
                      onChange={(e) => {
                        setscheduling({
                          ...scheduling,
                          startAt: e.target.value,
                        });
                      }}
                    />
                  </Col>
                  <Col md={4}>
                    <label className="date-pick">Ends at:</label>
                    <input
                      type="time"
                      class="form-control"
                      onChange={(e) => {
                        setscheduling({ ...scheduling, endAt: e.target.value });
                      }}
                    />
                  </Col>
                </Row>
              </div>
              {/* Basic info END */}
            </Col>
            {/* user info card  */}
            <Col md={5}>
              <div className="info-card">
                <div className="info-img">
                  <img src={imageURL + user?.photo} alt="" />
                </div>
                <div className="user-info">
                  <h3>{user?.userName}</h3>
                  <h6>(Admin)</h6>
                </div>
                <hr />
                <div className="admin-info">
                  <div className="ad-info">
                    <span>
                      <img src={admin_user} alt="icon" />
                    </span>
                    <h5>{user?.userName}</h5>
                  </div>
                </div>
                <div className="admin-info">
                  <div className="ad-info">
                    <span>
                      <img src={admin_email} alt="icon" />
                    </span>
                    <h5> {user?.email}</h5>
                  </div>
                </div>
                <div className="admin-info">
                  <div className="ad-info">
                    <span>
                      <img src={admin_call} alt="icon" />
                    </span>
                    <h5>{user?.contact}</h5>
                  </div>
                </div>
                <div className="admin-info">
                  <div className="ad-info">
                    <span>
                      <img src={admin_location} alt="icon" />
                    </span>
                    <h5>{user?.town}</h5>
                  </div>
                </div>
              </div>
            </Col>
            {/* user info card end */}

            {/* section 6 end  */}
            <Col md={12} className="advanced-sec">
              <Row>
                <Col md={6}>
                  <section className="ad-settings">
                    <div className="ad-head">
                      <h6>Advanced setting</h6>
                    </div>
                    {/* Basic info  */}
                    <div className="basic-info">
                      <Col md={12}>
                        <label>Time in Chat Cycle</label>
                        <Form.Select
                          type="Number"
                          onChange={(e) => {
                            setLougedata({
                              ...lougeData,
                              chatCycle: parseInt(e.target.value),
                            });
                          }}
                        >
                          <option value="10">10 minutes</option>
                          <option value="20">20 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="40">40 minutes</option>
                        </Form.Select>
                      </Col>
                      <Col md={12}>
                        <label>Max Participants</label>
                        <Form.Select
                          type="Number"
                          onChange={(e) => {
                            setLougedata({
                              ...lougeData,
                              participantsPerChat: parseInt(e.target.value),
                            });
                          }}
                        >
                          <option value="10">10 minutes</option>
                          <option value="20">20 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="40">40 minutes</option>
                        </Form.Select>
                      </Col>
                      <Col md={12}>
                        <label>IceBreaker</label>
                        <Select
                          // defaultValue={icebreaker[0]}
                          onChange={(e) => {
                            const arr = [...lougeData.icebreakers];
                            if (!arr.includes(e[e.length - 1]._id)) {
                              arr.push(e[e.length - 1]._id);
                            }

                            setLougedata({
                              ...lougeData,
                              icebreakers: arr,
                            });
                          }}
                          options={ice}
                          isMulti={true}
                          placeholder={"select icebreaker"}
                        />
                      </Col>

                      <Col md={12}>
                        <label>Advertisment</label>
                        <label className="lb">
                          Upload an image or URL for your advertisement
                        </label>

                        <div className="upload-desc welcome-board">
                          <label htmlFor="image">
                            {lougeData.advertisementBanner ? (
                              <img
                                src={URL.createObjectURL(
                                  lougeData.advertisementBanner
                                )}
                                alt=""
                              />
                            ) : (
                              <img src={upload} alt="" />
                            )}
                          </label>

                          <p>1200 x 1080 px recommended</p>
                          <input
                            type="file"
                            onChange={(e) => {
                              setLougedata({
                                ...lougeData,
                                advertisementBanner: e.target.files[0],
                              });
                            }}
                            style={{ display: "none" }}
                            id="image"
                          />
                        </div>
                        <Form.Control
                          type="text"
                          placeholder="Enter URL"
                          onChange={(e) => {
                            setLougedata({ ...lougeData, url: e.target.value });
                          }}
                        />
                      </Col>
                    </div>
                    <div className="setting-btn">
                      <p
                        onClick={() => {
                          onSubmitLouge();
                        }}
                      >
                        Create Lounge
                      </p>
                      {/* <Link to={"/Advance_settings"}>Create Lounge</Link> */}
                    </div>
                  </section>
                </Col>
                <Col md={6}>
                  <div className="basic-info lobby">
                    <Col md={12}>
                      <label>Time in Lobby</label>
                      <Form.Select
                        type="Number"
                        onChange={(e) => {
                          setLougedata({
                            ...lougeData,
                            lobbyInterval: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="10">10 minutes</option>
                        <option value="20">20 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="40">40 minutes</option>
                      </Form.Select>
                    </Col>
                    <Col md={12}>
                      <label>Event End Notification</label>
                      <Form.Select
                        type="Number"
                        onChange={(e) => {
                          setLougedata({
                            ...lougeData,
                            endNotificationReminder: parseInt(e.target.value),
                          });
                        }}
                      >
                        <option value="10">10 minutes</option>
                        <option value="20">20 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="40">40 minutes</option>
                      </Form.Select>
                    </Col>
                    <Col md={12}>
                      <label>Introduction</label>
                      <Select
                        onChange={(e) => {
                          const arr = [...lougeData.introductions];
                          if (!arr.includes(e[e.length - 1]._id)) {
                            arr.push(e[e.length - 1]._id);
                          }

                          setLougedata({
                            ...lougeData,
                            introductions: arr,
                          });
                        }}
                        options={intro}
                        isMulti={true}
                        placeholder={"select introduction"}
                      />
                    </Col>
                    {/* <Col md={12} className='intro'>
                      <label>Introduction</label>
                      <Form.Control type="text" placeholder="List 1" />
                      <Form.Control type="text" placeholder="List 2" />
                      <Form.Control type="text" placeholder="List 3" />
                      <Form.Control type="text" placeholder="List 4" />
                    </Col> */}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;
