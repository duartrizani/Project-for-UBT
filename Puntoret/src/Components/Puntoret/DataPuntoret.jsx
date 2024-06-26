import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DataPuntoret({ initialWorkerId }) {
  const [workerId, setWorkerId] = useState(initialWorkerId || localStorage.getItem('workerId'));
  const [employee, setEmployee] = useState([]);
  const [worker, setWorker] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Track selected month

  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        let response;

        // Try fetching employee data
        response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/oret/${workerId}`);
        if (response.data.Status && response.data.Result.length > 0) {
          setEmployee(response.data.Result);
        } else {
          // If no data
          response = await axios.get(`${import.meta.env.VITE_API_URL}/prog/oret/${workerId}`);
          if (response.data.Status && response.data.Result.length > 0) {
            setEmployee(response.data.Result);
          } else {
            response = await axios.get(`${import.meta.env.VITE_API_URL}/sound/oret/${workerId}`);
            if (response.data.Status && response.data.Result.length > 0) {
              setEmployee(response.data.Result);
            } else {
              setError("No employee data found.");
            }
          }
        }
      } catch (error) {
        setError("Error fetching employee data.");
      }
    };

    const fetchWorkerData = async () => {
      try {
        let response;

        // Try fetching worker data
        response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/employee/${workerId}`);
        if (response.data.Status && response.data.Result.length > 0) {
          const workerData = response.data.Result[0];
          setWorker({
            name: workerData.name,
            salary: workerData.salary,
            role: workerData.role,
          });
        } else {
          // If no data
          response = await axios.get(`${import.meta.env.VITE_API_URL}/prog/employee/${workerId}`);
          if (response.data.Status && response.data.Result.length > 0) {
            const workerData = response.data.Result[0];
            setWorker({
              name: workerData.name,
              salary: workerData.salary,
              role: workerData.role,
            });
          } else {
            response = await axios.get(`${import.meta.env.VITE_API_URL}/sound/employee/${workerId}`);
            if (response.data.Status && response.data.Result.length > 0) {
              const workerData = response.data.Result[0];
              setWorker({
                name: workerData.name,
                salary: workerData.salary,
                role: workerData.role,
              });
            } else {
              setError("No worker data found.");
            }
          }
        }
      } catch (error) {
        setError("Error fetching worker data.");
      }
    };

    fetchEmployeeData();
    fetchWorkerData();
  }, [workerId]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Filter employees based on selected month
  const filteredEmployees = employee.filter((worker) => new Date(worker.data).toISOString().slice(0, 7) === selectedMonth);

  const monthNamesAlbanian = {
    January: "Janar",
    February: "Shkurt",
    March: "Mars",
    April: "Prill",
    May: "Maj",
    June: "Qershor",
    July: "Korrik",
    August: "Gusht",
    September: "Shtator",
    October: "Tetor",
    November: "Nëntor",
    December: "Dhjetor"
  };

  const currentMonthName = new Date(selectedMonth).toLocaleDateString("en-US", { month: "long" });
  const translatedMonthName = monthNamesAlbanian[currentMonthName];

  // Calculate the total hours
  const totalOra = filteredEmployees.reduce((sum, e) => sum + e.ora, 0);

  const handleLogout = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`)
      .then(result => {
        if (result.data.Status) {
          localStorage.clear();
          navigate('/')
        }
      })
  }

  return (
    <div className="lg:px-5 mt-3 pl-2">
      <div className="flex flex-row justify-between max-lg:pr-2">

        <Link
          to={`/change/password/${workerId}`}
          className=" mt-3 mr-1 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Ndrysho Password
        </Link>
        <button
          onClick={handleLogout}
          className="mt-3 ml-1 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="d-flex justify-content-center max-lg:py-5 text-lg font-bold">
        <h3>Lista e orëve për "{translatedMonthName}"</h3>
      </div>


      <div className="mb-3 pr-2">
        <label htmlFor="monthInput" className="block text-sm font-medium text-gray-700 mb-1">Select Date:</label>
        <div className="relative">
          <input
            type="month"
            id="monthInput"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none max-lg:w-[80%]">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor ">
            </svg>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center max-lg:py-5 text-lg font-bold">
        <h3>Lista e orëve të {employee.length > 0 && employee[0].name}</h3>
      </div>

      <div className="d-flex justify-between max-lg:mr-2 text-lg font-bold px-5">
        <h3>Paga: {Number((totalOra * worker.salary).toFixed(2))}€</h3>
        <h3 className="">{totalOra} orë</h3>
      </div>

      <div className="mt-3 max-lg:hidden">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>Nr</th>
              <th>Data</th>
              <th>Dita</th>
              <th>Ora</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredEmployees.length > 0 ? ( // Check if filtered data exists
              filteredEmployees.map((e, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{new Date(e.data).toLocaleDateString('en-UK')}</td>
                  <td>{e.dita}</td>
                  <td>{e.ora}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nuk ka punëtorë për muajin e zgjedhur.</td> {/* Empty data message */}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE TABLE */}


      <div className="mt-3 lg:hidden pr-2 pb-2">

        <table className="table-auto border-collapse w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-3 py-2">Data</th>
              <th className="px-3 py-2">Dita</th>
              <th className="px-3 py-2">Ora</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredEmployees.length > 0 ? ( // Check if filtered data exists
              filteredEmployees.map((e) => (
                <tr>
                  <td className="border px-3 py-2">{new Date(e.data).toLocaleDateString('en-UK')}</td>
                  <td className="border px-3 py-2">{e.dita}</td>
                  <td className="border px-3 py-2">{e.ora}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nuk ka punëtorë për muajin e zgjedhur.</td> {/* Empty data message */}
              </tr>
            )}
          </tbody>
        </table>

      </div>



    </div>
  );
};
export default DataPuntoret;