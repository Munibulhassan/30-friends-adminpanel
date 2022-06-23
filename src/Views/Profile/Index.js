import { Container, Row, Col, Form,InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import user_img from '../../Assets/user-img.png'
import camera from '../../Assets/cam.png'
import { imageURL } from '../../Action/config';
import { useEffect, useState } from 'react';
import { logout, Updateprofile } from '../../Action/action';
import { toast } from 'react-toastify';
// import {useState} from "react"

// var axios = require('axios');
var FormData = require('form-data');

function Profile() {
  const [image, setImage] = useState('')
  const [payload,setpayload] = useState({
    photo: {},
    major:'',
    userName:'',    
    contact:'',
    town:''
    
  })
  console.log(payload);
  useEffect(()=>{setImage(null)},[])
  const navigate = useNavigate()
const onsubmit=()=>{
const data = new FormData()
data.append('photo', payload.photo)
data.append('userName', payload.userName)
data.append('contact', payload.contact)
data.append('town', payload.town)
data.append('major', payload.major)


 const res= Updateprofile(data)
 console.log(res);
 if(res){
  toast.success("Profile Updated Successfully")
  navigate("/")
  logout()
        localStorage.setItem('user','')
  localStorage.setItem('AccessToken','')
  
 }else{
  toast.error("Error Occured")

 }
  
}

   const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Row>
            <Col md={5}>
              <div className="board">
                <div className="welcom-desc">
                  <h5>Welcome Back,</h5>
                  <h6>{user?.username}</h6>
                </div>
                <div className="welcome-para">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec est enim. Nullam nulla est, vulputate vel elit ut.</p>
                </div>
              </div>
            </Col>
            <Col md={12}>
              <div className="profile-card">
                <Row>
                  <Col md={4}>
                    <div className="profile-img">
                    {
                      image?
                      <img src={image } alt="img" />
:
                      <img src={ imageURL+user.photo } alt="img" />
                    }
 

                      <div className="img-importer" >
                      <label  htmlFor="upload-button">

                      <img src={camera} alt="icon" />
                      </label>
                      </div>
                      <input type="file" id="upload-button" style={{ display: 'none' }} onChange={(e)=>{
                        setImage(URL.createObjectURL(e.target.files[0]))
                        setpayload({...payload,photo:e.target.files[0]})}} />
                    </div>
                    <div className="user-info">
                      <h3>{user.username}</h3>
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
                                value = {user.email}
                                disabled
                                // onChange={(e)=>{setUserdata(...payloadTransfer,{email:e.target.value})}}
                              />
                          {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
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
                                onChange={(e)=>{setpayload({...payload,userName:e.target.value})}}                      
                                // onChange={(e)=>{setUserdata(...payloadTransfer,{userName:e.target.value})}}
                              />
                          {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
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
                                onChange={(e)=>{setpayload({...payload,major:e.target.value})}}                      
                                // onChange={(e)=>{setUserdata(...payloadTransfer,{userName:e.target.value})}}
                              />
                              {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
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
                                onChange={(e)=>{setpayload({...payload,contact:e.target.value})}}                      
                              />
                          {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
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
                                onChange={(e)=>{setpayload({...payload,town:e.target.value})}}                      
                              />
                          {/* <InputGroup.Text id="basic-addon2">edit</InputGroup.Text> */}
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
            <div className="create-admin" >
            <p onClick={()=>{
              onsubmit()
            }}>

                  Create Admin
            </p>
                  
                </div>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
}

export default Profile;
