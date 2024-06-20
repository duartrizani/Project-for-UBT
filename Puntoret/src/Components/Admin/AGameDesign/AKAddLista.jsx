import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AKAddLista = () => {
    const [employee, setEmployee] = useState([]);
    const [workerdata, setWorkerdata] = useState([]);
    const navigate = useNavigate()
    const [selectedName, setSelectedName] = useState([]); // Track selected name
    const [albanianDay, setAlbanianDay] = useState(""); // Initialize with today's Albanian day
    const [employee1, setEmployee1] = useState({
        worker_id: "",
        name: "",
        data: new Date().toISOString().slice(0, 10),
        dita: albanianDay,
        ora: "",
    });

    const handleChange = (event) => {
        setEmployee1({ ...employee1, ora: event.target.value });
    };

    const combinedData = {
        ...employee1, // Spread operator to include existing employee1 data
        worker_id: selectedName?.worker_id, // Add worker_id from selectedName
        name: selectedName?.name, // Add name from selectedName
    };


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
            .get(`${import.meta.env.VITE_API_URL}/krye/workerdate`)
            .then((result) => {
                if (result.data.Status) {
                    setWorkerdata(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));

            setEmployee1(prevState => ({
                ...prevState,
                dita: albanianDay
            }));



    }, [albanianDay]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Filter the selected employees to include only those who are not already added for the selected date
        const selectedEmployeesData = selectedName.filter(selectedEmp => {
            return !workerdata.some(wd => wd.worker_id === selectedEmp.worker_id && wd.data === employee1.data);
        }).map((employee) => ({
            worker_id: employee.worker_id,
            name: employee.name,
            data: employee1.data,
            dita: employee1.dita,
            ora: employee1.ora,
        }));
    
        axios.post(`${import.meta.env.VITE_API_URL}/krye/addworkerklista`, selectedEmployeesData)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/gamedesign/klista');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }
 
    useEffect(() => {
        const daysOfWeek = ["E Hënë", "E Martë", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë", "E Dielë"];
        const today = new Date().getDay();
        const adjustedIndex = (today + 6) % 7; // Adjust for Sunday as 0
        const initialAlbanianDay = daysOfWeek[adjustedIndex];
        setAlbanianDay(initialAlbanianDay);
    }, []);

    const handleChangeDate = (e) => {
        const selectedDate = new Date(e.target.value);
        const adjustedIndex = (selectedDate.getDay() + 6) % 7;
        const daysOfWeek = ["E Hënë", "E Martë", "E Mërkure", "E Enjte", "E Premte", "E Shtunë", "E Dielë"];
        const newAlbanianDay = daysOfWeek[adjustedIndex];
        setEmployee1({ ...employee1, data: e.target.value, dita: newAlbanianDay });
        setAlbanianDay(newAlbanianDay); // Update albanianDay state with the new Albanian day
    };


    const filteredEmployees = employee.filter((emp) => {
        // Check if there's no entry in workerdata for the current date and employee's worker_id
        return !workerdata.find((wd) => wd.worker_id === emp.worker_id && wd.data === employee1.data);
    });

    const handleSelectAll = () => {
        // If all employees are already selected, deselect them
        if (selectedName.length === employee.length) {
            setSelectedName([]);
        } else {
            // Otherwise, select all employees
            setSelectedName([...employee]);
        }
    };



    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded border max-md:w-[80%]">
                <h3 className="text-center">Add Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="category" className="form-label">
                        </label>
                        <label for="name" className="form-label">
                            Select Employee
                        </label>
                        <div>
                            {filteredEmployees.length === 0 ? (
                                <p>No employees available</p>
                            ) : (
                                filteredEmployees.map((empName, index) => (
                                    <div key={empName.worker_id}>
                                        <label className="w-[20px] mr-1 text-center">{index + 1}</label>
                                        <input
                                            type="checkbox"
                                            id={empName.worker_id}
                                            value={empName.worker_id}
                                            checked={selectedName.some(emp => emp.worker_id === empName.worker_id)}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                if (isChecked) {
                                                    setSelectedName([...selectedName, empName]); // Add the selected employee to the list
                                                } else {
                                                    setSelectedName(selectedName.filter(emp => emp.worker_id !== empName.worker_id)); // Remove the unselected employee from the list
                                                }
                                            }}
                                        />
                                        
                                        <label htmlFor={empName.worker_id} className="ml-2">{empName.name}</label>
                                    </div>
                                ))
                            )}
                        </div>
                        <br></br>

                        <div>
                            {/* Button to select all/deselect all employees */}
                            <button
                                type="button"
                                className="btn btn-primary me-2"
                                onClick={handleSelectAll}
                            >
                                {selectedName.length === employee.length ? "Deselect All" : "Select All"}
                            </button>
                        </div>

                    </div>
                    <div className="col-12">
                        <label for="inputSalary" className="form-label">
                            Data
                        </label>
                        <input
                            type="date"
                            className="form-control rounded-0"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            value={employee1.data}  // Use employee1.data for the value
                            onChange={handleChangeDate} // Update state on change
                        />
                    </div>
                    <div className="col-12">
                        <label for="role" className="form-label">
                            Dita
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            value={albanianDay}
                            disabled
                            onChange={(e) =>
                                setEmployee1({ ...employee1, dita: albanianDay })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label for="inputora" className="form-label">
                            Orë
                        </label>
                        <div className="col-12 d-flex">
                            <input
                                required
                                type="number"
                                className="form-control rounded-0 flex-grow-1 me-2"
                                id="inputora"
                                value={employee1.ora}
                                placeholder="Orë"
                                onChange={handleChange}

                            />
                            <button type="button" className="btn btn-primary me-2" onClick={() => setEmployee1({ ...employee1, ora: "8" })}>
                                8
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => setEmployee1({ ...employee1, ora: "9" })}>
                                9
                            </button>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Vazhdo
                        </button>

                    </div>
                </form>
            </div>

        </div>
    );
};

export default AKAddLista;
