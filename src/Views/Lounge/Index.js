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

import lounge_bg from "../../Assets/lounge-bg.png";
import {
  deleteLounge,
  getAlllounges,
  updateLounge,
  updateloungeimages,
} from "../../Action/action";

import { toast } from "react-toastify";

function Lounge() {
  const [show, setShow] = useState(false);
  const [edit, setedit] = useState(true);
  const [status, setstatus] = useState("pending");
  const [id, setid] = useState();
  const [data, setdata] = useState([]);
  const [banner, setbanner] = useState("");
  const [isImageChanged, setisImageChanged] = useState(false);

  const [content, setcontent] = useState({});
  const [scheduling, setscheduling] = useState({
    interval: "",
    scheduleDate: "",
    startAt: "",
    endAt: "",
  });

  const [page, setpage] = useState(1);
  const [count, setcount] = useState([]);

  const getLounges = async (page) => {
    const res = await getAlllounges(status, page);
    var arr = [];
    var count = 0;
    if (parseInt(res.noLounges / 10) * 10 == res.noLounges) {
      count = res.noLounges / 10;
    } else {
      count = parseInt(res.noLounges / 10) + 1;
    }

    for (var i = 1; i <= count; i++) {
      arr.push(i);
    }
    setcount(arr);
    setdata(res.lounges);
  };
  useEffect(() => {
    getLounges(page);
  }, [status, page]);

  const handleClose = () => {
    setShow(false);
    setedit(true);
  };

  const update = async () => {
    if (!JSON.stringify(scheduling.startAt).includes("T")) {
      scheduling.startAt =
      scheduling.scheduleDate.split('T')[0] + "T" + scheduling.startAt + ":00.000Z";
    }
    if (!JSON.stringify(scheduling.endAt).includes("T")) {
      scheduling.endAt =
        scheduling.scheduleDate.split('T')[0] + "T" + scheduling.endAt + ":00.000Z";
    }
console.log(scheduling)
    const payload = {
      name: content.name,
      description: content.description,
      eventType: content.eventType,
      scheduling: scheduling,
    };

    const res = await updateLounge(id, payload);

    if(isImageChanged){
      const response = await updateloungeimages(id, {
        banner: banner
      });
    }

    if(res){
    getLounges();

    }
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
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>

                {/* <th>photo</th> */}
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
                      <td>{item?.name}</td>

                      <td>
                        {item.description.length > 30
                          ? item?.description.slice(0, 30) + "..."
                          : item?.description}
                      </td>
                      <td>
                        <Form.Select
                          value={item.status}
                          aria-label="Event Type"
                          onChange={async (e) => {
                            const res = await updateLounge(item._id, {
                              status: e.target.value,
                            });
                            await getLounges();
                          }}
                          style={{ "margin-bottom": "20px" }}
                        >
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>

                          <option value="end">End</option>
                        </Form.Select>
                      </td>
                      {/* <th>
                      <img src={imageURL+ item?.banner}/>
                      </th> */}
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
                              setscheduling(item.scheduling);
                              setbanner(item.banner);
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
                      {/* {banner?(
                      <img src={imageURL+ banner} alt="img" />

                    ):(

                      <img src={lounge_bg} alt="img" />
                    )}
                     */}

                      <img src={lounge_bg} alt="img" />

                      <div className="lounge-btns">
                        <span className="bin">
                          <button
                            type="delete"
                            onClick={(e) => {
                              setisImageChanged(true);
                              setbanner("");
                            }}
                          >
                            <i class="fa-solid fa-trash-can" />
                          </button>
                        </span>
                        <label htmlFor="image-uploading">
                          <span className="edit">
                            <button type="edit">
                              <i class="fa-solid fa-pen-to-square" />
                            </button>
                          </span>
                        </label>

                        <input
                          type="file"
                          onChange={(e) => {
                            if (
                              ["jpeg", "png", "jpg"].includes(
                                e.target.files[0].name.split(".")[1]
                              )
                            ) {
                              setisImageChanged(true);

                              setbanner(e.target.files[0]);
                            } else {
                              toast.info("Invalid image type");
                            }
                          }}
                          style={{ display: "none" }}
                          id="image-uploading"
                        />
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
                            setcontent({
                              ...content,
                              eventType: e.target.value,
                            });
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
                                setcontent({
                                  ...content,
                                  description: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>
                        </div>
                      </Col>
                      <div className="basic-info">
                        <Row>
                          {content.eventType !== "permanent" ? (
                            <>
                              <Col md={4}>
                                <label className="date-pick">
                                  Schedule Date:{" "}
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  defaultValue={
                                    scheduling?.scheduleDate.split("T")[0]
                                  }
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
                                  defaultValue={
                                    scheduling?.startAt
                                      ?.split("T")[1]
                                      ?.split(".")[0]
                                  }
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
                                  defaultValue={
                                    scheduling?.endAt
                                      ?.split("T")[1]
                                      ?.split(".")[0]
                                  }
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
                              </Col>
                            </>
                          ) : null}

                          <Col md={6}>
                            <div
                              className="update"
                              onClick={() => {
                                setShow(false);

                                update();
                              }}
                            >
                              <p>Update</p>
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
