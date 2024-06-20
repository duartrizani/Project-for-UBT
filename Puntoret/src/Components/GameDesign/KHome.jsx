import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProgHome = () => {
  const [seniorCount, setSeniorCount] = useState(0);
  const [juniorCount, setJuniorCount] = useState(0);
  const [midlevelCount, setMidlevelCount] = useState(0);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchWorkerCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/senior_count`);
        if (response.data.Status) {
          setSeniorCount(response.data.Result.worker_count); // Assuming 'worker_count' property
        } else {
          console.error("Error fetching worker count:", response.data.Error);
          // Handle error (e.g., display an error message to the user)
        }
      } catch (error) {
        console.error("Error fetching worker count:", error);
        // Handle error (e.g., display an error message to the user)
      }
    };

    fetchWorkerCount();

    const fetchPuntorCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/junior_count`);
        if (response.data.Status) {
          setJuniorCount(response.data.Result.worker_count); // Assuming 'worker_count' property
        } else {
          console.error("Error fetching worker count:", response.data.Error);
          // Handle error (e.g., display an error message to the user)
        }
      } catch (error) {
        console.error("Error fetching worker count:", error);
        // Handle error (e.g., display an error message to the user)
      }
    };

    fetchPuntorCount();

    const fetchMjeshterCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/midlevel_count`);
        if (response.data.Status) {
          setMidlevelCount(response.data.Result.worker_count); // Assuming 'worker_count' property
        } else {
          console.error("Error fetching worker count:", response.data.Error);
          // Handle error (e.g., display an error message to the user)
        }
      } catch (error) {
        console.error("Error fetching worker count:", error);
        // Handle error (e.g., display an error message to the user)
      }
    };

    fetchMjeshterCount();

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/employeegamedesign`);
        if (response.data.Status) {
          setEmployees(response.data.Result);
        } else {
          console.error("Error fetching employees:", response.data.Error);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3 w-full max-md:flex-col'>
        <div className="col-md-4 md:pr-5">
          <div className="card card-1">
            <div>
              <div className='text-center pb-1'>
                <h4>Senior</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{seniorCount}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 md:pr-5">
          <div className="card card-2">
            <div>
              <div className='text-center pb-1'>
                <h4>Mid-level</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{midlevelCount}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card card-3">
            <div>
              <div className='text-center pb-1'>
                <h4>Junior</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{juniorCount}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col mt-4 pt-3 pl-5 max-md:w-full'>
        <h3 className=''>Kryepuntori i Team "Programer"</h3>
        <table className="table justify-evenly">
          <thead>
            <tr>
              <th className='w-1/4'>Name</th>
              <th className='w-1/4'>Role</th>
              <th className='w-1/4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.worker_id}>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>
                  {/* Add action buttons or links here */}
                  <button className='btn btn-primary btn-sm'>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgHome;
