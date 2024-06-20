import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ASoundEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()
  const [dropdownState, setDropdownState] = useState({ isOpen: false, activeDropdown: null });
  const [nextId, setNextId] = useState(1);



  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/sound/employee`)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));



  }, []);
  const handleDelete = (worker_id) => {
    if (confirm("Are you sure you want to delete this employee?")) {


      axios.delete(`${import.meta.env.VITE_API_URL}/sound/delete_worker/` + worker_id)
      axios.delete(`${import.meta.env.VITE_API_URL}/sound/delete_employee/` + worker_id)
        .then(result => {
          if (result.data.Status) {
            window.location.reload()
          } else {
            alert(result.data.Error)
          }
        })
    }
  }

  const toggleDropdown = (workerId) => {
    setDropdownState((prevState) => ({
      isOpen: !prevState.isOpen || prevState.activeDropdown !== workerId,
      activeDropdown: workerId
    }));
  };



  return (
    <div className="lg:px-5 mt-3 pl-2">
      <div className="d-flex justify-content-center max-lg:py-5 text-lg font-bold">
        <h3>Lista Puntorëve</h3>
      </div>
      <Link to="/dashboard/soundeffect/add_employee" className="btn btn-success ">
        Shto Puntorë
      </Link>
      <div className="mt-3 max-lg:hidden">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>Nr</th>
              <th>Emri</th>
              <th>Paga /orë (NETO)</th>
              <th>Paga /orë (BRUTO)</th>
              <th>Roli</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {employee.map((e, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.salary}€</td>
                <td>{Number((e.salary * 1.125).toFixed(2))}€</td>
                <td>{e.role}</td>
                <td>
                  <Link
                    to={`/dashboard/soundeffect/oret/` + e.worker_id}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Orët
                  </Link>
                  <Link
                    to={`/dashboard/soundeffect/edit_employee/` + e.worker_id}
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
            ))}
          </tbody>
        </table>
      </div>


      {/* MOBILE TABLE */}


      <div className="mt-3 flex lg:hidden">
  <table className="table border-separate border-spacing-2">
    <tbody className="flex flex-col border-collapse">
      {employee.map((e, index) => (
        <div className="order-spacing-3 my-1 mr-3 border" key={e.worker_id}>
          {/* Employee Name - Clickable to toggle dropdown */}
          <tr
            className="flex items-center text-wrap justify-between cursor-pointer"
            onClick={() => toggleDropdown(e.worker_id)}
            key={`employee-${e.worker_id}`}
          >
            <th className="text-left max-w-[160px]">{index + 1}</th>
            <td className="flex justify-end font-semibold">{e.name}</td>
          </tr>

          {/* Dropdown Section */}
          {dropdownState.isOpen && dropdownState.activeDropdown === e.worker_id && (
            <>
              <tr className="flex items-center text-wrap justify-between">
                <th className="text-left max-w-[160px]">Paga /orë (NETO)</th>
                <td className="flex justify-end">{e.salary}€</td>
              </tr>

              <tr className="flex items-center text-wrap justify-between">
                <th className="text-left max-w-[160px]">Paga /orë (BRUTO)</th>
                <td className="flex justify-end">{Number((e.salary * 1.125).toFixed(2))}€</td>
              </tr>
              <tr className="flex items-center text-wrap justify-between">
                <th className="text-left max-w-[160px]">Roli</th>
                <td className="flex justify-end">{e.role}</td>
              </tr>
              <tr className="flex items-center text-wrap justify-between">
                <th className="text-left max-w-[160px]">Action</th>
                <td className="flex justify-end">
                  <Link to={`/dashboard/soundeffect/oret/` + e.worker_id} className="btn btn-primary btn-sm me-2">
                    Orët
                  </Link>
                  <Link to={`/dashboard/soundeffect/edit_employee/` + e.worker_id} className="btn btn-info btn-sm me-2">
                    Edit
                  </Link>
                  <button className="btn btn-warning btn-sm" onClick={() => handleDelete(e.worker_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            </>
          )}
        </div>
      ))}
    </tbody>
  </table>
</div>




    </div>
  );
};

export default ASoundEmployee;
