import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [workerCount, setWorkerCount] = useState(0);
  const [puntorCount, setPuntorCount] = useState(0);
  const [mjeshterCount, setMjeshterCount] = useState(0);

  const navigate = useNavigate()


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
          <div class="card card-1 h-[200px] justify-center"
          onClick={() => navigate("/kontabilist/gamedesign")}>
            <div>
              <div className='text-center pb-1 '>
                <h4>Game Design</h4>
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
          <div class="card card-2 h-[200px] justify-center "
          onClick={() => navigate("/kontabilist/programers")}>
            <div>
              <div className='text-center pb-1'>
                <h4>Programers</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{mjeshterCount}</h5>
              </div>
            </div>
          </div>
        </div>


        <div class="col-md-4 " >
          <div class="card card-3 h-[200px] justify-center"
          onClick={() => navigate("/kontabilist/soundeffect")}>
            <div>
              <div className='text-center pb-1'>
                <h4>Sound Effect</h4>
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

    </div>
  )
}


export default Home
