import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`)
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid")
          localStorage.removeItem("role", "admin");
          navigate('/');
        }
      });
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className="flex">
      <div className="col-auto col-md-3 col-xl-2 bg-dark text-white hidden lg:block">
        <div className="flex flex-col items-center lg:items-start p-4 min-h-screen">
          <Link
            to="/dashboard"
            className="flex items-center mb-6 text-white text-decoration-none"
          >
            <span className="text-2xl font-bold">UBT Project</span>
          </Link>
          <ul className="nav flex-col w-full">
            <li className="w-full">
              <Link
                to="/dashboard"
                className="flex items-center py-2 hover:bg-gray-700 transition duration-200"
              >
                <i className="bi bi-speedometer2 text-xl"></i>
                <span className="ml-4 hidden lg:inline">Dashboard</span>
              </Link>
            </li>
            <li className="w-full">
              <div
                className="flex items-center py-2 px-1 hover:bg-gray-700 transition duration-200 cursor-pointer"
                onClick={() => toggleDropdown("gamedesign")}
              >
                <i className="bi bi-controller text-xl"></i>
                <span className="ml-4 hidden lg:inline">Game Design</span>
                <i className={`bi ml-auto ${openDropdown === "gamedesign" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
              </div>
              <ul className={`flex flex-col ml-1 overflow-hidden transition-all duration-300 ${openDropdown === "gamedesign" ? "max-h-40" : "max-h-0"}`}>

                <li className="w-100 hover:bg-gray-700 transition duration-200 ">
                  <Link
                    to="/dashboard/gamedesign/employee"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="text-base bi-people ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Manage Employees
                    </span>
                  </Link>
                </li>

                <li className="w-100 hover:bg-gray-700 transition duration-200">
                  <Link
                    to="/dashboard/gamedesign/klista"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="bi bi-columns text-base ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Lista
                    </span>
                  </Link>
                </li>

                <li className="w-100 hover:bg-gray-700 transition duration-200 mb-2">
                  <Link
                    to="/dashboard/gamedesign/puntoret"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="bi bi-person text-base ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Rroga dhe Orët
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="w-full">
              <div
                className="flex items-center py-2 hover:bg-gray-700 transition duration-200 cursor-pointer px-1"
                onClick={() => toggleDropdown("programers")}
              >
                <i className="bi bi-code-slash text-xl"></i>
                <span className="ml-4 hidden lg:inline">Programers</span>
                <i className={`bi ml-auto ${openDropdown === "programers" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
              </div>
              <ul className={`flex flex-col ml-1 overflow-hidden transition-all duration-300 ${openDropdown === "programers" ? "max-h-40" : "max-h-0"}`}>
              <li className="w-100 hover:bg-gray-700 transition duration-200 ">
                  <Link
                    to="/dashboard/programer/employee"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="text-base bi-people ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Manage Employees
                    </span>
                  </Link>
                </li>

                <li className="w-100 hover:bg-gray-700 transition duration-200">
                  <Link
                    to="/dashboard/programer/klista"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="bi bi-columns text-base ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Lista
                    </span>
                  </Link>
                </li>

                <li className="w-100 hover:bg-gray-700 transition duration-200 mb-2">
                  <Link
                    to="/dashboard/programer/puntoret"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="bi bi-person text-base ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Rroga dhe Orët
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="w-full">
              <div
                className="flex items-center py-2 hover:bg-gray-700 transition duration-200 cursor-pointer px-1"
                onClick={() => toggleDropdown("soundeffect")}
              >
                <i className="bi bi-music-note-list text-xl"></i>
                <span className="ml-4 hidden lg:inline">Sound Effect</span>
                <i className={`bi ml-auto ${openDropdown === "soundeffect" ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
              </div>
              <ul className={`flex flex-col ml-1 overflow-hidden transition-all duration-300 ${openDropdown === "soundeffect" ? "max-h-40" : "max-h-0"}`}>
              <li className="w-100 hover:bg-gray-700 transition duration-200 ">
                  <Link
                    to="/dashboard/soundeffect/employee"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="text-base bi-people ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Manage Employees
                    </span>
                  </Link>
                </li>

                <li className="w-100 hover:bg-gray-700 transition duration-200">
                  <Link
                    to="/dashboard/soundeffect/klista"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="bi bi-columns text-base ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Lista
                    </span>
                  </Link>
                </li>

                <li className="w-100 hover:bg-gray-700 transition duration-200 mb-2">
                  <Link
                    to="/dashboard/soundeffect/puntoret"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="bi bi-person text-base ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">
                      Rroga dhe Orët
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="w-full" onClick={handleLogout}>
              <div className="flex items-center py-2 hover:bg-gray-700 transition duration-200 cursor-pointer px-1">
                <i className="bi bi-power text-xl"></i>
                <span className="ml-4 hidden lg:inline">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <div className="p-2 flex justify-center shadow text-xl font-bold py-3 bg-white">
          <h4>Sistemi i Puntorëve</h4>
        </div>
        <Outlet />
      </div>

      {/* Navigation Bar - Mobile (Bottom) */}
      <ul className="lg:hidden fixed bottom-0 w-full bg-dark text-white p-3 flex justify-around items-center">
        <li>
          <Link to="/dashboard" className="text-white">
            <i className="bi bi-speedometer2 text-xl"></i>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/gamedesign" className="text-white">
            <i className="bi bi-controller text-xl"></i>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/programers" className="text-white">
            <i className="bi bi-code-slash text-xl"></i>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/soundeffect" className="text-white">
            <i className="bi bi-music-note-list text-xl"></i>
          </Link>
        </li>
        <li onClick={handleLogout}>
          <a className="text-white cursor-pointer">
            <i className="bi bi-power text-xl"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
