import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()
  const [category, setCategory] = useState([]);


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/employee`)
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`${import.meta.env.VITE_API_URL}/auth/category`)
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));



  }, []);

  const arrayDataItems = category.map((c) => (c.cname));
  const arrayDataItems2 = employee.map((e) => (e.category_id));

  const categoryName = (e) => {
    {
      if (arrayDataItems == arrayDataItems2) {
        return (arrayDataItems)

      }
    }
  }


  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/auth/delete_employee/` + id)
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
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Category</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {employee.map((e) => {


              if (e.category_id === "1") {
                return setCategory ("mjeshter")
              }

              return (

                <tr>
                  <td>{e.name}</td>
                  <td>
                    <img
                      src={`http://localhost:3000/Images/` + e.image}
                      className="employee_image"
                    />
                  </td>
                  <td>{e.email}</td>
                  <td>{e.address}</td>
                  <td>{e.salary}€</td>
                  <td>
                    {e.category_id == "1" ? <td>IT</td> : e.category_id == '2' ? <td>IT2</td> : <td>Developer</td>} 
                  </td>
                  <td>
                    {e.category_id}
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/` + e.id}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(e.id)}
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
  );
};

export default Employee;
