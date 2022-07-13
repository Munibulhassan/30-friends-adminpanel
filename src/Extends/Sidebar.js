import { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../Action/action";
import logo from "../Assets/logo.png";
function Sidebar() {
  const navigate = useNavigate();
  const Logout = () => {
    logout();
    localStorage.setItem("user", "");
    localStorage.setItem("AccessToken", "");
    navigate("/");
  };
  // useEffect(() => {
  //   const token = localStorage.getItem("AccessToken");

  //   if (!token) {
  //     toast.info("Login First");
  //     navigate("/");
  //   }
  // }, []);
  return (
    <div
      className="sidebar"
      style={{ display: window?.location?.pathname==="/" ? "none" : "block" }}
    >
      <div className="logo">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          onClick={() => {
            navigate("/Loungecreate");
          }}
        />
      </div>
      <div className="navbar">
        <ul>
          <li >
            <Link exact="true" to="/Loungecreate">
              Dashboard
            </Link>
          </li>
          <li class="active">
            <Link exact="true" to="/Profile" className="">
              Profile
            </Link>
          </li>
          <li >
            <Link exact="true" to="/Icebreakers" className="">
              IceBreakers
            </Link>
          </li>
          <li>
            <Link exact="true" to="/Users" className="">
              Users
            </Link>
          </li>
          <li>
            <Link exact="true" to="/Introduction" className="">
              Introduction
            </Link>
          </li>
          <li>
            <Link exact="true" to="/Lounge" className="">
              Lounge
            </Link>
          </li>
        </ul>
      </div>
      <div className="log-setting">
        <li>
          <p onClick={() => Logout()}>Log Out</p>
        </li>
      </div>
    </div>
  );
}

export default Sidebar;
