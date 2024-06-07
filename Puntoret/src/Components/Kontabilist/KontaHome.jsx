import axios from 'axios'
import React, { useEffect, useState } from 'react'

const KontaHome = () => {
  const [workerCount, setWorkerCount] = useState(0);
  const [puntorCount, setPuntorCount] = useState(0);
  const [mjeshterCount, setMjeshterCount] = useState(0);


  useEffect(() => {
    const fetchWorkerCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/ujipuntoret_count`);
        if (response.data.Status) {
          setWorkerCount(response.data.Result.worker_count); // Assuming 'worker_count' property
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/ujipuntor_count`);
        if (response.data.Status) {
          setPuntorCount(response.data.Result.worker_count); // Assuming 'worker_count' property
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/krye/ujimjeshter_count`);
        if (response.data.Status) {
          setMjeshterCount(response.data.Result.worker_count); // Assuming 'worker_count' property
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

  }, []);



  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3 w-full max-md:flex-col'>




        <div class="col-md-4 md:pr-5">
          <div class="card card-1">
            <div>
              <div className='text-center pb-1'>
                <h4>Uji Puntorët Total</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{workerCount}</h5>
              </div>
            </div>
          </div>
        </div>


        <div class="col-md-4 md:pr-5">
          <div class="card card-2">
            <div>
              <div className='text-center pb-1'>
                <h4>Rryma Puntorët Total</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{mjeshterCount}</h5>
              </div>
            </div>
          </div>
        </div>


        <div class="col-md-4 ">
          <div class="card card-3">
            <div>
              <div className='text-center pb-1'>
                <h4>Izolimi Puntorët Total</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{puntorCount}</h5>
              </div>
            </div>
          </div>
        </div>

        



      </div>




      <div className='flex flex-col mt-4 pt-3 pl-5 max-md:w-full'>
        <h3 className=''>List of Admins</h3>
        <table className="table justify-evenly">
          <thead>
            <tr>
              <th className='w-1/2'>Email</th>
              <th className='w-1/4'>Roles</th>
              <th className=''>Action</th>
            </tr>
          </thead>
          <tbody>
            Something else COMING SOON!
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default KontaHome
