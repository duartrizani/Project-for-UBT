import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const gamedesign = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`)
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        localStorage.removeItem("role", "gamedesign");
        anvigate('/')
      }
    })
  }
  return (
    <div className="flex">
    
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark max-lg:hidden">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/gamedesign"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                UBT- Game Design
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/gamedesign"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/gamedesign/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/gamedesign/klista"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="bi bi-columns text-xl ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Lista
                  </span>
                </Link>
              </li>

              <li className="w-100">
                <Link
                  to="/gamedesign/puntoret"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="bi bi-person text-xl ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Rroga dhe Orët
                  </span>
                </Link>
              </li>
              
              
              <li className="w-100" onClick={handleLogout}>
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
{/* Content */}
<div className="flex-grow">
        <div className="p-2 flex justify-center shadow text-xl font-bold py-3">
          <h4>Sistemi i Puntorëve</h4>
        </div>
        <Outlet />
      </div>
      

      {/* Navigation Bar - Mobile (Bottom) */}
      <ul className="lg:hidden fixed w-full bg-dark p-3 flex justify-around items-center overflow-hidden">
  <li className="">
    <Link to="/gamedesign" className="text-white">
      <i className="bi bi-speedometer2 text-xl"></i>
    </Link>
  </li>
  <li className="">
    <Link to="/gamedesign/employee" className="text-white">
      <i className="bi bi-people text-xl"></i>
    </Link>
  </li>
  <li className="">
    <Link to="/gamedesign/klista" className="text-white">
      <i className="bi bi-columns text-xl"></i>
    </Link>
  </li>

  <li className="">
    <Link to="/gamedesign/puntoret" className="text-white">
      <i className="bi bi-person text-xl"></i>
    </Link>
  </li>
  <li className="" onClick={handleLogout}>
    <a className="text-white cursor-pointer">
      <i className="bi bi-power text-xl"></i>
    </a>
  </li>
</ul>

    </div>
  );
};

export default gamedesign;