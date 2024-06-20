import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ASoundPuntoret = () => {
    const [employee, setEmployee] = useState([]);
    const [worker, setWorker] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Track selected month (0-11)
    const navigate = useNavigate()




    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/sound/klista`)
            .then((result) => {
                if (result.data.Status) {
                    // Filter employee data by month
                    const filteredEmployee = result.data.Result.filter(
                        (e) => e.data.slice(0, 7) === selectedMonth
                    );
                    setEmployee(filteredEmployee);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));

        axios
            .get(`${import.meta.env.VITE_API_URL}/sound/employee`)
            .then((result) => {
                if (result.data.Status) {
                    setWorker(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, [selectedMonth]);

    const toggleDropdown = (workerId) => {
        setOpenDropdown(openDropdown === workerId ? null : workerId);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };


    return (
        <div className="lg:px-5 mt-3 pl-2">
            <div className="flex justify-center py-5 text-lg font-bold">
                <h3>Puntorët Rroga dhe Orët</h3>
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


            <div className="mt-3 max-lg:hidden">
                <table className="w-full table-auto border-collapse">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Emri</th>
                            <th className="px-4 py-2">Paga / orë (NETO)</th>
                            <th className="px-4 py-2">Orët</th>
                            <th className="px-4 py-2">Paga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {worker.map((w) => {
                            // Filter employee data by worker_id and selected month
                            const filteredEmployee = employee.filter((e) => e.worker_id === w.worker_id && e.data.slice(0, 7) === selectedMonth);

                            // Calculate totalOra for the selected month
                            const totalOra = filteredEmployee.reduce((acc, curr) => acc + curr.ora, 0);

                            return (
                                <React.Fragment key={w.worker_id}>
                                    <tr
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => toggleDropdown(w.worker_id)}
                                    >
                                        <td className="border px-4 py-2">{w.name}</td>
                                        <td className="border px-4 py-2">{w.salary}€</td>
                                        <td className="border px-4 py-2">{totalOra} orë</td>
                                        <td className="border px-3 py-2">{Number((totalOra * w.salary).toFixed(2))}€</td>
                                    </tr>
                                    {openDropdown === w.worker_id && (
                                        <tr>
                                            <td colSpan="5">
                                                <table className="w-full table-auto border-collapse">
                                                    <tbody>
                                                        {filteredEmployee.map((e, index) => (
                                                            <tr key={index} className="bg-gray-50">
                                                                <td className="border px-4 py-2">{new Date(e.data).toLocaleDateString('en-UK')}</td>
                                                                <td className="border px-4 py-2">{e.dita}</td>
                                                                <td className="border px-4 py-2">{e.ora} orë</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>


            {/* MOBILE TABLE */}


            <div className="mt-3 lg:hidden pr-2">
                <table className="table-auto border-collapse w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-3 py-2">Emri</th>
                            <th className="px-3 py-2">Paga / Orë</th>
                            <th className="px-3 py-2">Orët</th>
                        </tr>
                    </thead>
                    <tbody>
                        {worker.map((w) => {
                            // Filter employee data by worker_id and selected month
                            const filteredEmployee = employee.filter((e) => e.worker_id === w.worker_id && e.data.slice(0, 7) === selectedMonth);

                            // Calculate totalOra for the selected month
                            const totalOra = filteredEmployee.reduce((acc, curr) => acc + curr.ora, 0);

                            return (
                                <React.Fragment key={w.worker_id}>
                                    <tr
                                        className="cursor-pointer hover:bg-gray-100"
                                        onClick={() => toggleDropdown(w.worker_id)}
                                    >
                                        <td className="border px-3 py-2">{w.name}</td>
                                        <td className="border px-3 py-2">{w.salary}€ / {Number((totalOra * w.salary).toFixed(2))}€</td>
                                        <td className="border px-3 py-2">{totalOra} orë</td>
                                    </tr>
                                    {openDropdown === w.worker_id && (
                                        <>
                                            {filteredEmployee.map((e, index) => (
                                                <tr key={index} className="bg-gray-50 w-full">
                                                    <td className="border px-2 py-2 w-full" colSpan="3">
                                                        <div className="flex flex-row">
                                                            <span className="font-semibold mx-1">Data:</span> {new Date(e.data).toLocaleDateString('en-UK')} |
                                                            <span className="font-semibold mx-1"> Dita:</span><span className="w-[80px]">{e.dita}</span> | {/* Added ml-1 class */}
                                                            <span className="font-semibold mx-1"> Ora:</span> {e.ora} orë
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}

                                </React.Fragment>                          
                            );

                            
                        })}
                    </tbody>
                </table>


            </div>




        </div>
    );
};

export default ASoundPuntoret;