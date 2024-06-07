import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PuntoretUji = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()
  const [category, setCategory] = useState([]);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/krye/employee`)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/kryepuntoruji`)
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

  }, []);


  const handleDelete = (worker_id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/krye/delete_worker/` + worker_id)
    axios.delete(`${import.meta.env.VITE_API_URL}/krye/delete_employee/` + worker_id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload()
        } else {
          alert(result.data.Error)
        }
      })
  }


  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/addpuntoretuji" className="btn btn-success" disabled>
        Shto Puntor
      </Link>
      <div className="mt-3 pt-4">
        <div>

        <div className="d-flex">
        <h5>Kryepuntori</h5>
      </div>
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roli</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {category.filter(c => c.roles === "Uji").map((c) => (
              <tr>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.roles}</td>
              </tr>
            ))}
          </tbody>
          
        </table>

        </div>
      
        <br/>

        <div>
        <div className="d-flex">
        <h5>Puntorët</h5>
      </div>

        <table className="table">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Puntori ID</th>
              <th>Name</th>
              <th>Paga</th>
              <th>Roli</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {employee.map((e) => {


              if (e.category_id === "1") {
                return setCategory("mjeshter")
              }

              return (

                <tr>
                  <td>{e.id}</td>
                  <td>
                    {e.worker_id}
                  </td>
                  <td>{e.name}</td>
                  <td>{e.salary}€</td>
                  <td>{e.role}</td>
                  <td>


                    <Link
                      to={`/dashboard/editpuntoretuji/` + e.worker_id}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(e.worker_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        </div>
        
      </div>
    </div>
  );
};

export default PuntoretUji;
