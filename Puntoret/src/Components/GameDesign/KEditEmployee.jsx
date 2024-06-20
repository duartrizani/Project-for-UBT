import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const KEditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    salary: "",
    role: "Mjeshtër",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/krye/employee/` + id)
      .then(result => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          salary: result.data.Result[0].salary,
          role: result.data.Result[0].role,
        })
      }).catch(err => console.log(err))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${import.meta.env.VITE_API_URL}/krye/edit_employee/` + id, employee)
      .then(result => {
        if (result.data.Status) {
          navigate('/kryepuntor/employee').reload();
        } else {
          alert(result.data.Error);
        }
      }).catch(err => console.log(err));

    // Check if salary has changed
    const originalSalary = result.data.Result[0].salary;
    if (employee.salary !== originalSalary) {
      axios.put(`${import.meta.env.VITE_API_URL}/krye/edit_employee/${id}`, { salary: employee.salary })
        .then(result => {
          if (result.data.Status) {
            // Optional: Display success message for salary update
          } else {
            alert(result.data.Error);
          }
        }).catch(err => console.log(err));
    }
  }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded border max-md:w-[80%]">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className='col-12'>
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, role: e.target.value})}>
                  <option value="" selected disabled>Zgjidh</option>;
                  <option value="Mjeshtër">Mjeshtër</option>;
                  <option value="Punëtor">Punëtor</option>;
            </select>
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default KEditEmployee