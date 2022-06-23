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
import { deleteIcebreakers, getIcebreakers,updateIcebreakers } from "../../Action/action";

function Icbreakers() {
  const [show, setShow] = useState(false);
  const [edit, setedit] = useState(true);
  const [id, setid] = useState();
  const [data, setdata] = useState([]);
  const [name,setname] = useState('')
  const [description, setdescription] = useState('')
  const [status,setstatus]=useState('active')

const getbreaker = async ()=>{
  const res = await getIcebreakers(status);
  setdata(res);
}
  useEffect( () => {
    getbreaker()
  }, [status]);

  const update = async ()=>{
    const payload = {
      name:name,
      description:description
      
    }
    console.log(payload);
    const res = await updateIcebreakers(id,payload)
    if(res){
      getbreaker()
    }
  }


  const del = () => {
    deleteIcebreakers(id);
  };

  const handleClose = () => setShow(false);

  return (
    <section className="icebreaker-sec">
      <Container>
        <div className="board">
        <Row>
        <Col md={8}></Col>
          <Col md={4}>
          <Form.Select aria-label="Event Type" onChange={e=>{setstatus(e.target.value)}} style={{'margin-bottom':'20px'}}>
                  
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
              <Button type="button">
              <i class="fa-solid fa-square-caret-left" />
                {/* <FontAwesomeIcon icon={solid("caret-left")} /> */}
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
            <Modal.Title>Delete IceBreaker</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Container>
              {edit ? (
            <Row>
                
                <Col md={6}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Event Name..."
                  onChange={(e) => {
                    setname(e.target.value)
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
                        setdescription(e.target.value)
                      }}
                    />
                  </Form.Group>
                </div>
              </Col>
               <Col md={6}>
               <div
                 className="update"
                 onClick={() => {
                  setShow(false);
                  update()
                }}
               >
                 <p   >Update</p>
               </div>
             </Col>
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
    </section>
  );
}

export default Icbreakers;
