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

import {
  createbulkintroduction,
  createintroduction,
  getIntroduction,
  updateintroduction,
} from "../../Action/action";
import Papa from "papaparse";
import { toast } from "react-toastify";
function Introduction() {
  const [show, setShow] = useState(false);
  const [status, setstatus] = useState("active");
  const [data, setdata] = useState([]);
  const [edit, setedit] = useState(true);
  const [text, settext] = useState("");
  const [category, setcategory] = useState("");
  const [introid, setintroid] = useState("");
  const [page, setpage] = useState(1);
  const [count, setcount] = useState([]);

  const getintro = async () => {
    const res = await getIntroduction(status, page);
    var arr = [];
    for (var i = 1; i <= parseInt(res.totalCount / 10) + 1; i++) {
      arr.push(i);
    }
    setcount(arr);
    setdata(res.data);
  };

  useEffect(() => {
    getintro();
  }, [status, page]);

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
  const bulkcreation = async (data) => {
    console.log(data);
    const payload = {
      introductions: data,
    };

    await createbulkintroduction(payload);

    getintro();
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
                  <label htmlFor="upload">
                    <p>
                      csv <i class="fas fa-upload"></i>
                    </p>
                  </label>

                  <input
                    type="file"
                    id="upload"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files[0].name.split(".")[1] !== "csv") {
                        toast.info("file must have extention csv");
                      } else {
                        const reader = new FileReader();

                        // Event listener on reader when the file
                        // loads, we parse it and set the data.
                        reader.onload = async ({ target }) => {
                          const csv = Papa.parse(target.result, {
                            header: true,
                          });
                          const parsedData = [];
                          csv?.data.map((item) => {
                            if (item.text) {
                              parsedData.push(item);
                            }
                          });

                          bulkcreation(parsedData);
                        };
                        reader.readAsText(e.target.files[0]);
                      }
                    }}
                  />
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
                <th>Category</th>
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
                      <td>
                        {index + ((page - 1) * 10 + 1) > 9
                          ? index + ((page - 1) * 10 + 1)
                          : "0" + (index + ((page - 1) * 10 + 1))}
                      </td>

                      <td>{item.text}</td>
                      <td>{date}</td>
                      <td>{item.category}</td>

                      <td>
                        {item.active===true ? (
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
                              settext(item.text);
                              setcategory(item.category);

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
              <Button
                type="button"
                onClick={() => {
                  var i = count.indexOf(page);
                  if (i - 1!==-1) {
                    setpage(page - 1);
                  }
                }}
              >
                <i class="fa-solid fa-square-caret-left" />
                {/* <FontAwesomeIcon icon={solid("caret-left")} /> */}
              </Button>
            </div>
            {count.map((item) => {
              if (page===item) {
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
                  value={text}
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
                  value={category}

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
