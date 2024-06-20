import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProgOret = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Track selected month (0-11)

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/prog/oret/${id}` // Assuming no month filter in API call
      );

      if (response.data.Status) {
        setEmployee(response.data.Result);
      } else {
        alert(response.data.Error);
      }
    };

    fetchEmployees();
  }, [id]); // Fetch data on id change only (no dependency on selectedMonth)

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // Filter employees based on selected month within the component
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



  return (
    <div className="lg:px-5 mt-3 pl-2">
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
      <div className="mt-3 max-lg:hidden">
        <table className="table">
          <thead className="text-center">
            <tr>
              <th>Emri</th>
              <th>Data</th>
              <th>Dita</th>
              <th>Ora</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredEmployees.length > 0 ? ( // Check if filtered data exists
              filteredEmployees.map((e) => (
                <tr>
                  <td>{e.name}</td>
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


      <div className="mt-3 lg:hidden pr-2">

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

export default ProgOret;