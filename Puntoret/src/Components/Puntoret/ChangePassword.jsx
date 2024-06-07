import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ChangePassword = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        password: "",
    });
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/password/` + id);
            const employeeData = response.data.Result[0]; // Assuming single record
      
            setEmployee({
              id: employeeData.id,
              name: employeeData.name,
              password: employeeData.password,
            });
          } catch (error) {
            console.error("Error fetching employee data:", error);
          }
        };
      
        fetchData();
      }, [id]);


    



    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/datapuntoret')

        axios.put(`${import.meta.env.VITE_API_URL}/auth/changepassword/` + id, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/datapuntoret')
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
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
                        disabled
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
                        <label for="inputPassword" className="form-label">
                            Password-i Ri
                        </label>
                        <input
                            required
                            type="text"
                            className="form-control rounded-0"
                            id="inputPassword"
                            placeholder="Shkruaj Password"
                            autoComplete="off"
                            onChange={(e) =>
                                setEmployee({ ...employee, password: e.target.value })
                            }
                        />
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

export default ChangePassword