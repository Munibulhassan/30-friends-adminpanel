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
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import lounge_bg from "../../Assets/lounge-bg.png";
import { deleteLounge, getAlllounges, updateLounge } from "../../Action/action";
function Lounge() {
  const [show, setShow] = useState(false);
  const [edit, setedit] = useState(true);
  const [status, setstatus] = useState("pending");
  const [id, setid] = useState();
  const [data, setdata] = useState([]);

  const [content, setcontent] = useState({});
  const [scheduling, setscheduling] = useState({
    interval: "",
    scheduleDate: '',
    startAt: "",
    endAt: "",
  });
  const [payload, setpayload] = useState({
    name: "",
    eventType: "",
    description: "",
  });
  console.log(content);
  console.log(scheduling);

  const getLounges = async () => {
    setdata(await getAlllounges(status));

    return data;
  };
  useEffect(() => {
    getLounges();
  }, [status]);

  const handleClose = () => {
    setShow(false);
    setedit(true);
  };

  const update = () => {
    const payload = {
      'name':content.name,
      'description':content.description,
      'eventType':content.eventType,
      'scheduling':scheduling,
    }
    


    updateLounge(id, payload);
  };
  const del = async (id) => {
    const res = await deleteLounge(id);
    getLounges();
  };

  return (
    <section className="icebreaker-sec lounge-sec">
      <Container>
        <div className="board">
          <Row>
            <Col md={8}></Col>
            <Col md={4}>
              <Form.Select
                aria-label="Event Type"
                onChange={(e) => {
                  setstatus(e.target.value);
                }}
                style={{ "margin-bottom": "20px" }}
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="end">End</option>
              </Form.Select>
            </Col>
          </Row>
          
          <Table striped bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => {
                  let date = new Date(item.scheduling.scheduleDate);
                  date = date.toLocaleString().split(",")[0];
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item?.description}</td>
                      <td>{date}</td>
                      <td>
                        <span className="bin">
                          <button
                            type="delete"
                            onClick={(e) => {
                              setid(item._id);
                              setShow(true);
                              setedit(false);
                            }}
                          >
                          <i class="fa-solid fa-trash-can" />
                            
                          </button>
                        </span>
                        <span className="edit">
                          <button
                            type="edit"
                            onClick={() => {
                              setid(item._id);
                              setShow(true);
                              setcontent(item);
                              setscheduling(item.scheduling)
                            }}
                          >
                          <i class="fa-solid fa-pen-to-square" />
                            
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h1>No Records </h1>
              )}
            </tbody>
          </Table>
          <div className="page-changer">
            <div className="arrow-prev">
              <Button type="button">
              <i class="fa-solid fa-square-caret-left" />

              </Button>
            </div>

            <Link to={"/"} className="active">
              1
            </Link>
            <Link to={"/"}>2</Link>
            <Link to={"/"}>3</Link>
            <Link to={"/"}>4</Link>
            <div className="arrow-prev">
              <Button type="button">
              <i class="fa-solid fa-square-caret-right" />

              </Button>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          centered
          size="md"
          className="main-modal"
        >
          <Modal.Header closeButton>
            {edit ? (
              <Modal.Title>Edit Lounge</Modal.Title>
            ) : (
              <Modal.Title>Delete Lounge</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Container>
              {edit ? (
                <Row>
                  <Col md={12}>
                    <div className="loung-bg">
                      <img src={lounge_bg} alt="img" />
                      <div className="lounge-btns">
                        <span className="bin">
                          <button type="delete">
                          <i class="fa-solid fa-trash-can" />
                        
                          </button>
                        </span>
                        <span className="edit">
                          <button type="edit">
                          <i class="fa-solid fa-pen-to-square" />
                        
                          </button>
                        </span>
                      </div>
                    </div>
                  </Col>
                  <div className="basic-info">
                    <label>Basic Information</label>
                    <Row>
                      <Col md={6}>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Event Name..."
                          defaultValue={content.name}
                          onChange={(e) => {
                            setcontent({ ...content, name: e.target.value });
                          }}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Select
                          defaultValue={content.eventType}
                          onChange={(e) => {
                            setcontent({ ...content, eventType: e.target.value });
                           
                          }}
                        >
                          <option>Event Type</option>
                          <option value="timed">Timed</option>
                          <option value="permanent">Permanent</option>
                        </Form.Select>
                      </Col>
                      <Col md={12}>
                        <div className="basic-info">
                          <label>Description</label>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Type Here..."
                              defaultValue={content.description}
                              onChange={(e) => {
                            setcontent({ ...content, description: e.target.value });
                                
                              
                              }}
                            />
                          </Form.Group>
                        </div>
                      </Col>
                      <div className="basic-info">
                        <Row>
                          <Col md={4}>
                            <label className="date-pick">Schedule Date: </label>
                            <input
                              type="date"
                              className="form-control"
                              defaultValue={scheduling?.scheduleDate}
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
                              className="form-control"
                              defaultValue={scheduling?.startAt}
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
                              defaultValue={scheduling?.endAt}
                              onChange={(e) => {
                                setscheduling({
                                  ...scheduling,
                                  endAt: e.target.value,
                                });
                              }}
                            />
                          </Col>
                          <Col md={12}>
                            <div className="basic-info">
                              <label>Recurring</label>
                              <div className="custom-check">
                                <label class="container">
                                  Daily
                                  <input
                                    type="radio"
                                    name="radio"
                                    value="Daily"
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
                                  Weekly
                                  <input
                                    type="radio"
                                    name="radio"
                                    value="Weekly"
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
                                    value="Monthly"
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
                                    value="None"
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
                          </Col>
                          <Col md={6}>
                            <div
                              className="update"
                              onClick={() => {
                                setShow(false);
                                
                                update();
                              }}
                            >
                            <p>

                              Update
                            </p>
                              
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Row>
                  </div>
                </Row>
              ) : (
                <>
                  <div className="update" style={{ "margin-left": "22%" }}>
                    <p
                      onClick={() => {
                        setShow(false);

                        setedit(true);
                        del(id);
                      }}
                    >
                      Yes
                    </p>
                    <p
                      onClick={() => {
                        setShow(false);

                        setedit(true);
                      }}
                    >
                      No
                    </p>
                  </div>
                </>
              )}
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
}

export default Lounge;
