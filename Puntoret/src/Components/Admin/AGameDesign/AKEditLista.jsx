import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AKEditLista = () => {
    const { id } = useParams()
    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        ora: "",
    });
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/klista/` + id);
            const employeeData = response.data.Result[0]; // Assuming single record
      
            setEmployee({
              id: employeeData.id,
              name: employeeData.name,
              ora: employeeData.ora,
              data: employeeData.data,
              dita: employeeData.dita,
            });
          } catch (error) {
            console.error("Error fetching employee data:", error);
          }
        };
      
        fetchData();
      }, [id]);


    



    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/dashboard/gamedesign/klista')

        axios.put(`${import.meta.env.VITE_API_URL}/krye/edit_klista/` + id, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/gamedesign/klista')
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
                        <label for="inputData" className="form-label">
                            DATA
                        </label>
                        <input
                        disabled
                            type="text"
                            className="form-control rounded-0"
                            id="inputData"
                            placeholder={employee.data}
                            autoComplete="off"
                            value={employee.data}
                        />
                    </div>

                    <div className='col-12'>
                        <label for="inputDita" className="form-label">
                            DITA
                        </label>
                        <input
                        disabled
                            type="text"
                            className="form-control rounded-0"
                            id="inputData"
                            placeholder={employee.dita}
                            autoComplete="off"
                            value={employee.dita}
                        />
                    </div>

                    <div className='col-12'>
                        <label for="inputOra" className="form-label">
                            ORË
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputOra"
                            placeholder="Orë"
                            autoComplete="off"
                            value={employee.ora}
                            onChange={(e) =>
                                setEmployee({ ...employee, ora: e.target.value })
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

export default AKEditLista