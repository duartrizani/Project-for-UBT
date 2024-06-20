import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Proglista = () => {
  const [worker, setWorker] = useState([]);
  const [filteredWorker, setFilteredWorker] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Default to current date
  const [selectedEmployees, setSelectedEmployees] = useState([]); // Track selected employees
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]); // Track selected employee IDs
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/prog/klista`);
        if (response.data.Status) {
          setWorker(response.data.Result);
        } else {
          alert(response.data.Error);
        }
      } catch (error) {
        console.error("Error fetching worker data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = worker.filter((employee) => employee.data === selectedDate);
    setFilteredWorker(filteredData);
  }, [worker, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };



  const toggleSelectAll = () => {
    // If all employees are already selected, deselect them
    if (selectedEmployeeIds.length === filteredWorker.length) {
      setSelectedEmployeeIds([]);
    } else {
      // Otherwise, select all employees
      setSelectedEmployeeIds(filteredWorker.map(emp => emp.id));
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete the selected employees?")) {
      axios.delete(`${import.meta.env.VITE_API_URL}/prog/delete_workers`, { data: { idsToDelete: selectedEmployeeIds } })
        .then(result => {
          if (result.data.Status) {
            // Remove deleted employees from filteredWorker
            setFilteredWorker(prevFilteredWorker =>
              prevFilteredWorker.filter(emp => !selectedEmployeeIds.includes(emp.id))
            );
            setSelectedEmployeeIds([]); // Clear selected employees after deletion
          } else {
            alert(result.data.Error);
          }
        })
        .catch(error => {
          console.error("Error deleting employees:", error);
        });
    }
  };

  const handleEmployeeSelect = (employee) => {
    // Toggle selection of employee by ID
    setSelectedEmployeeIds(prevSelectedEmployeeIds => {
      if (prevSelectedEmployeeIds.includes(employee.id)) {
        // Employee ID already selected, remove from selection
        return prevSelectedEmployeeIds.filter(id => id !== employee.id);
      } else {
        // Employee ID not selected, add to selection
        return [...prevSelectedEmployeeIds, employee.id];
      }
    });
  };

  const sortedFilteredWorker = [...filteredWorker].sort((a, b) => {
    // Sort alphabetically based on the 'name' property
    return a.name.localeCompare(b.name);
  });

  const handleDeleteButton = (e) => {

    const workerId = e.id;


    if (confirm("Are you sure you want to delete this employee?")) {
      axios.delete(`${import.meta.env.VITE_API_URL}/prog/delete_klista/${workerId}`)
        .then(result => {
          window.location.reload()

          // Handle successful deletion (update UI, refresh data)
        })
        .catch(error => {
          console.error("Error deleting employee:", error);
          // Display error message
        });
    }
  };

  const toggleDropdown = (workerId) => {
    setActiveDropdown((prevActive) => (prevActive === workerId ? null : workerId));
  };


  const DELETEALLSelectAll = () => {
    // If all employees are already selected, deselect them
    if (selectedEmployeeIds.length === filteredWorker.length) {
      setSelectedEmployeeIds([]);


      if (confirm("Are you sure you want to delete the selected employees?")) {
        axios.delete(`${import.meta.env.VITE_API_URL}/prog/delete_workers`, { data: { idsToDelete: selectedEmployeeIds } })
          .then(result => {
            if (result.data.Status) {
              // Remove deleted employees from filteredWorker
              setFilteredWorker(prevFilteredWorker =>
                prevFilteredWorker.filter(emp => !selectedEmployeeIds.includes(emp.id))
              );
              setSelectedEmployeeIds([]); // Clear selected employees after deletion
            } else {
              alert(result.data.Error);
            }
          })
          .catch(error => {
            console.error("Error deleting employees:", error);
          });
      }


    }
  };


  return (
    <div className="lg:px-5 mt-3 pl-2">
      <div className="d-flex justify-content-center">
        <h1 className="font-semibold">Lista e Orëve të Puntorëve</h1>
      </div>

      <div className="mb-3 pr-2">
        <label htmlFor="dateInput" className="block text-sm font-medium text-gray-700 mb-1">Select Date:</label>
        <div className="relative">
          <input
            type="date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none max-lg:w-[80%]">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor ">
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-between">

        <Link to="/programer/add_klista" className="btn btn-success ">
          Shto Listë
        </Link>

        <button type="button" className="btn btn-danger max-lg:mr-2" onClick={handleDelete}>
          Delete Selected
        </button>

      </div>


      <div className="mt-3">
        <div className="flex justify-between mb-3 max-lg:hidden">
          <div>

          </div>
          <div>
            {/* Select all checkbox */}
            <input
              type="checkbox"
              checked={selectedEmployeeIds.length === filteredWorker.length}
              onChange={toggleSelectAll}
            />
            <label className="ml-2">Select All</label>
          </div>
        </div>

        <table className="table max-lg:hidden">
          <thead className="text-center">
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>DATA</th>
              <th>DITA</th>
              <th>ORËT</th>
              <th>ACTION</th>
              <th>SELECT</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {sortedFilteredWorker.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{new Date(selectedDate).toLocaleDateString('en-UK')}</td>
                <td>{e.dita}</td>
                <td>{e.ora}</td>

                <td>
                  <Link
                    to={`/gamedesign/edit_klista/${e.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleDeleteButton(e)}
                  >
                    Delete
                  </button>
                  
                </td>
                <td className="w-10">
                  <input
                    type="checkbox"
                    checked={selectedEmployeeIds.includes(e.id)}
                    onChange={() => handleEmployeeSelect(e)}
                  />
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* MOBILE TABLE */}


      <div className="mt-3 lg:hidden">
        <div className="d-flex justify-content-center">
          <h1 className="font-semibold">Data: {new Date(selectedDate).toLocaleDateString('en-UK').slice(0, 10)}</h1>
        </div>
        <table className="table border-separate border-spacing-2">
          <tbody className="flex flex-col border-collapse">
            {filteredWorker.map((e, index) => (
              <div className="order-spacing-3 my-1 mr-2 border " key={e.id}>
                {/* Worker Name - Clickable to toggle dropdown font-mono */}
                <tr
                  className="flex items-center text-wrap justify-between cursor-pointer"
                  onClick={() => toggleDropdown(e.id)}
                  key={`worker-${e.id}`}
                >
                  <th className="text-left">{index + 1}</th>
                  <th className="text-left w-[200px]">{e.name}</th>
                  <td className="flex justify-end">Orë</td>
                  <td className="flex justify-end">{e.ora}</td>
                  <input
                    type="checkbox"
                    checked={selectedEmployeeIds.includes(e.id)}
                    onChange={() => handleEmployeeSelect(e)}
                    onClick={(event) => event.stopPropagation()}
                  />
                </tr>

                {/* Dropdown Section */}
                {activeDropdown === e.id && (
                  <>
                    <tr className="flex items-center text-wrap justify-between">
                      <th className="text-left max-w-[160px]">Data</th>
                      <td className="flex justify-end">
                        {new Date(selectedDate).toLocaleDateString('en-UK')}
                      </td>
                    </tr>
                    <tr className="flex items-center text-wrap justify-between">
                      <th className="text-left max-w-[160px]">Dita</th>
                      <td className="flex justify-end">{e.dita}</td>
                    </tr>
                    <tr className="flex items-center text-wrap justify-between">
                      <th className="text-left max-w-[160px]">Action</th>
                      <td className="flex justify-end">
                        <Link to={`/programer/edit_klista/` + e.id} className="btn btn-info btn-sm me-2">
                          Edit
                        </Link>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleDeleteButton(e)}
                        >
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

export default Proglista;