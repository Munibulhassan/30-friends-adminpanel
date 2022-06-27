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
import { toast } from "react-toastify";
import {
  createbulkiceabreaker,
  createicebreakers,
  getIcebreakers,
  updateIcebreakers,
} from "../../Action/action";
import * as fs from "fs";

import Papa from "papaparse";

const { parse } = require("csv-parse");
function Icbreakers() {
  const [show, setShow] = useState(false);
  const [edit, setedit] = useState(true);
  const [id, setid] = useState();
  const [data, setdata] = useState([]);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("active");
  const [page, setpage] = useState(1);
  const [count, setcount] = useState([]);

  const getbreaker = async () => {
    const res = await getIcebreakers(status);
    ///setcount(res.length)
    var arr = [];
    for (var i = 1; i <= parseInt(res.length / 10) + 1; i++) {
      arr.push(i);
    }
    setcount(arr);
    setdata(res);
  };

  useEffect(() => {
    getbreaker();
  }, [status]);

  const update = async (introid, payload) => {
    const res = await updateIcebreakers(introid, payload);
    if (res) {
      getbreaker();
    }
  };

  const createicebreaker = async (payload) => {
    const res = await createicebreakers(payload);
    if (res) {
      getbreaker();
    }
  };

  const bulkcreation = async (data) => {
    console.log(data);
    const payload = {
      icebreakers: data,
    };
    const res = await createbulkiceabreaker(payload);
    getbreaker();
  };

  const handleClose = () => setShow(false);

  return (
    <section className="icebreaker-sec">
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
                        console.log(reader);

                        reader.onload = async ({ target }) => {
                          console.log(target);
                          const csv = Papa.parse(target.result, {
                            header: true,
                          });
                          const parsedData = [];
                          csv?.data.map((item) => {
                            if (item.name && item.description) {
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
                <th>Name</th>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                let date = new Date(item?.createdAt);

                date = date.toLocaleString().split(",")[0];
                return (
                  <tr>
                    <td>{index > 9 ? index + 1 : "0" + (index + 1)}</td>
                    <td>{item?.name}</td>

                    <td>{item?.description}</td>
                    <td>{date}</td>
                    <td>
                      {item.active == true ? (
                        <span className="disable">
                          <p
                            onClick={() => {
                              update(item?._id, { active: false });
                              // introductoinStatusUpdate(item._id, false);
                            }}
                          >
                            disable
                          </p>
                        </span>
                      ) : (
                        <span className="enable">
                          <p
                            onClick={() => {
                              setid(item._id);

                              update(item?._id, { active: true });

                              // introductoinStatusUpdate(item._id, true);
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
                            setid(item._id);
                            setShow(true);
                            setedit(true);
                          }}
                        >
                          {/* <FontAwesomeIcon icon={solid("pen-to-square")} /> */}
                          <i class="fa-solid fa-pen-to-square" />
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="page-changer">
            <div className="arrow-prev">
              <Button type="button" onClick={()=>{
                var i = count.indexOf(page)
                if(i-1!=-1){
                  setpage(page-1)
                }
                
              }}>
                <i class="fa-solid fa-square-caret-left" />
                {/* <FontAwesomeIcon icon={solid("caret-left")} /> */}
              </Button>
            </div>
            {count.map((item) => {
              if (page == item) {
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
              <Button type="button"  onClick={()=>{
                var i = count.indexOf(page)
                if(i+1>!count.length-1){
                  setpage(page+1)
                }
                
              }}>
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
            <Modal.Title>Edit IceBreaker</Modal.Title>
          ) : (
            <Modal.Title>Create IceBreaker</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Event Name..."
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
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
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
              </Col>
              <Col md={6}>
                {edit ? (
                  <div
                    className="update"
                    onClick={() => {
                      setShow(false);
                      update(id, {
                        name: name,
                        description: description,
                      });
                    }}
                  >
                    <p>Update</p>
                  </div>
                ) : (
                  <div
                    className="update"
                    onClick={() => {
                      setShow(false);
                      createicebreaker({
                        name: name,
                        description: description,
                      });
                    }}
                  >
                    <p>Create</p>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default Icbreakers;
