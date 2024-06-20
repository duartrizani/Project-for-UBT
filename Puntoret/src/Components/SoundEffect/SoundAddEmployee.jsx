import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const SoundAddEmployee = () => {
  const [employee, setEmployee] = useState({
    worker_id:"",
    name: "",
    salary: "",
    role: "Senior",
  });
  const navigate = useNavigate()
  



  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  


  const handleSubmit = (e) => {

    e.preventDefault()
  
        
      axios.post(`${import.meta.env.VITE_API_URL}/sound/add_employee`, employee)
      .then(result => {
          if(result.data.Status) {
              navigate('/soundeffect/employee')
          } else {
              alert(result.data.Error)
              
          }
      })
      .catch(err => console.log(err))


  }



  return (
    <div className="flex justify-center align-items-center mt-3">
      <div className="p-3 rounded border max-md:w-[80%]">
        <h3 className="text-center">Add Employee</h3>
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
              onChange={(e) =>
                {setEmployee({ ...employee, name: e.target.value })}
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSalary" className="form-label">
              Paga
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="role" className="form-label">
              Roli
            </label>
            <select name="role" id="role" className="form-select"
                onChange={(e) => setEmployee({...employee, role: e.target.value})}>
              <option value="Senior">Senior</option>;
              <option value="Mid-level">Mid-level</option>;
              <option value="Junior">Junior</option>;
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100" onClick={(e)=> setEmployee({ ...employee, worker_id: small_id })}>
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SoundAddEmployee;
