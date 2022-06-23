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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from "react-router-dom";
import {
  createintroduction,
  getIntroduction,
  updateintroduction,
} from "../../Action/action";
function Introduction() {
  const [show, setShow] = useState(false);
  const [status, setstatus] = useState("active");
  const [data, setdata] = useState([]);
  const [edit, setedit] = useState(true);
  const [text, settext] = useState("");
  const [category, setcategory] = useState("");
  const [introid, setintroid] = useState("");

  const getintro = async () => {
    const res = await getIntroduction(status);
    setdata(res);
  };

  useEffect(() => {
    getintro();
  }, [status]);

  const introductoinStatusUpdate = async (id, status) => {
    const payload = {
      active: status,
    };

    const res = await updateintroduction(id, payload);

    if (res) {
      getintro();
    }
  };

  const createIntro = async (data) => {
    const res = await createintroduction(data);

    if (res) {
      getintro();
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <section className="icebreaker-sec intro-sec">
      <Container>
        <div className="board">
          <Row>
            <Col md={8}>
              <div className="disable">
                <span>
                  <p
                    onClick={() => {
                      setShow(true);
                      setedit(false);
                    }}
                  >
                    Create
                  </p>
                </span>

                <span style={{ "margin-left": "10px" }}>
                  <p
                    onClick={() => {
                      setShow(true);
                      setedit(false);
                    }}
                  >
                    csv <i class="fas fa-upload"></i>
                  </p>
                </span>
              </div>
            </Col>

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
          </Row>
          <Table striped bordered>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Intro Text</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => {
                  let date = new Date(item?.createdAt);

                  date = date.toLocaleString().split(",")[0];
                  return (
                    <tr>
                      <td>{index > 9 ? index + 1 : "0" + (index + 1)}</td>

                      <td>{item.text}</td>
                      <td>{date}</td>

                      <td>
                        {item.active == true ? (
                          <span className="disable">
                            <p
                              onClick={() => {
                                introductoinStatusUpdate(item._id, false);
                              }}
                            >
                              disable
                            </p>
                          </span>
                        ) : (
                          <span className="enable">
                            <p
                              onClick={() => {
                                introductoinStatusUpdate(item._id, true);
                              }}
                            >
                              enable
                            </p>
                          </span>
                        )}
                        <span className="edit">
                          <button
                            type="edit"
                            style={{ "margin-left": "20px" }}
                            onClick={() => {
                              setShow(true);
                              setedit(true);
                              setintroid(item._id);
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
      </Container>
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
            <Modal.Title>Edit Introduction</Modal.Title>
          ) : (
            <Modal.Title>Create Introduction</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Intro....."
                  onChange={(e) => {
                    settext(e.target.value);
                  }}
                />
              </Col>

              <Col md={6}>
                <Form.Select
                  aria-label="Category"
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                >
                  <option value="about">About</option>
                  <option value="computer">Computer</option>
                  <option value="hobby">Hobby</option>
                  <option value="game">Games</option>
                </Form.Select>
              </Col>
              {edit ? (
                <div className="update">
                  <p
                    onClick={async () => {
                      setShow(false);
                      await updateintroduction(introid, {
                        text: text,
                        category: category,
                      });
                      getintro();
                    }}
                  >
                    Update
                  </p>
                </div>
              ) : (
                <div className="update">
                  <p
                    onClick={async () => {
                      setShow(false);
                      createIntro({
                        text: text,
                        category: category,
                      });
                    }}
                  >
                    Create
                  </p>
                </div>
              )}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default Introduction;
