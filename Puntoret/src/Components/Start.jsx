import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/verify`);
        if (response.data.Status) {
          if (response.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate(`/employee_detail/${response.data.id}`);
          }
        } else {
          setError("Verification failed. Please try again.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("An unexpected error occurred. Please try again later.");
      }
    };

    verify(); // Call the verification function
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login-container">



      {/* WORKING!! */}


      <div className="container px-4 py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6 login-form card shadow p-4">
            <h2 className="text-center mt-4 mb-4">Login As</h2>

            <div className="d-flex flex-wrap justify-content-between mb-4">
              <button
                type="button"
                className="btn btn-success btn-lg w-100 mb-3"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg w-100 mb-3" // Added margin-bottom for spacing
                onClick={() => navigate("/contactus")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>






      {/* NOT WORKING */}


{/*       
      <div className="container px-4 py-5">
      <h1 className="text-center mb-7 text-[30px] text-danger font-bold">Nuk është duke punuar për momentin!!</h1>
        
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-6 login-form card shadow p-4">
            <h2 className="text-center mt-4 mb-4">Login As</h2>

            <div className="d-flex flex-wrap justify-content-between mb-4">

              <button
              disabled
                type="button"
                className="btn btn-success btn-lg w-100 mb-3"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
              disabled
                type="button"
                className="btn btn-primary btn-lg w-100 mb-3" // Added margin-bottom for spacing
                onClick={() => navigate("/contactus")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-center mt-7 text-[30px] text-primary font-bold">Rregullohet pas pak!</h1>
      </div> */}




    </div>
  );
};

export default Start;
