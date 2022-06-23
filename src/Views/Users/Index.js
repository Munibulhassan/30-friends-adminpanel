import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import user_icon1 from "../../Assets/User-icon1.png";
import { useEffect, useState } from "react";
import { getAlluser, updateUserStatus } from "../../Action/action";

function Users() {
  const [data, setdata] = useState([]);
  const [status,setstatus]=useState('active')

  // const [range,setrange] = useState([])
  // const [page, setpage] = useState(1);
  
  
  const getusers = async () => {
    console.log(status);
    const res = await getAlluser(status);
    
    setdata(res);
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
  }, [status]);
  

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
    <section className="icebreaker-sec users-sec">
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
                <th>User Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr>
                    <td>{index > 9 ? index + 1 : "0" + (index + 1)}</td>
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
                      {item.active=="active" ? (
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
    </section>
  );
}

export default Users;
