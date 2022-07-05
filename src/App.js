
import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./Views/Profile/Index";
import Advance_settings from "./Views/Advance_settings/Index";
import Icebreakers from "./Views/Icebreakers/Index";
import Users from "./Views/Users/Index";
import Introduction from "./Views/Introduction/Index";
import Lounge from "./Views/Lounge/Index";
import Login from "./Views/Login/Login";
import Dashboard from './Views/Dashboard';
import reportWebVitals from "./reportWebVitals";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Extends/Sidebar";


function App() {
  return (
    <div className="App"  style={{backgroundColor: window.location.pathname == "/" ? 'white' : "#F0F3FA" }}>
    <BrowserRouter basename="/">
    <section className="main-layout">
      <Container fluid>
        <Row>
          <ToastContainer />

          <Col xs={2} md={2} lg={2} className="px-0">
            <Sidebar />
          </Col>

          <Col xs={10} md={10} lg={10}>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route path="/Loungecreate" element={<Dashboard />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Advance_settings" element={<Advance_settings />} />
              <Route path="/Icebreakers" element={<Icebreakers />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Introduction" element={<Introduction />} />
              <Route path="/Lounge" element={<Lounge />} />
            </Routes>
            {/* <Footer /> */}
          </Col>
        </Row>
      </Container>
    </section>
  </BrowserRouter>,
    </div>
  );
}

export default App;
