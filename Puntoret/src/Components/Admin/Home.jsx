import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [gameDesignCount, setGameDesignCount] = useState(0);
  const [programerCount, setProgramerCount] = useState(0);
  const [soundEffectCount, setSoundEffectCount] = useState(0);

  const navigate = useNavigate()


  useEffect(() => {
    const fetchGameDesignCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/gamedesign_count`);
        if (response.data.Status) {
          setGameDesignCount(response.data.Result.worker_count); // Assuming 'worker_count' property
        } else {
          console.error("Error fetching worker count:", response.data.Error);
          // Handle error (e.g., display an error message to the user)
        }
      } catch (error) {
        console.error("Error fetching worker count:", error);
        // Handle error (e.g., display an error message to the user)
      }
    };

    fetchGameDesignCount();


    const fetchProgramerCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/programer_count`);
        if (response.data.Status) {
          setProgramerCount(response.data.Result.worker_count); // Assuming 'worker_count' property
        } else {
          console.error("Error fetching worker count:", response.data.Error);
          // Handle error (e.g., display an error message to the user)
        }
      } catch (error) {
        console.error("Error fetching worker count:", error);
        // Handle error (e.g., display an error message to the user)
      }
    };

    fetchProgramerCount();


    const fetchSoundEffectCount = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/soundeffect_count`);
        if (response.data.Status) {
          setSoundEffectCount(response.data.Result.worker_count); // Assuming 'worker_count' property
        } else {
          console.error("Error fetching worker count:", response.data.Error);
          // Handle error (e.g., display an error message to the user)
        }
      } catch (error) {
        console.error("Error fetching worker count:", error);
        // Handle error (e.g., display an error message to the user)
      }
    };

    fetchSoundEffectCount();

  }, []);



  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3 w-full max-md:flex-col'>




        <div class="col-md-4 md:pr-5">
          <div class="card card-1 h-[200px] justify-center"
          onClick={() => navigate("/dashboard/gamedesign/employee")}>
            <div>
              <div className='text-center pb-1 '>
                <h4>Game Design</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{gameDesignCount}</h5>
              </div>
            </div>
          </div>
        </div>


        <div class="col-md-4 md:pr-5">
          <div class="card card-2 h-[200px] justify-center "
          onClick={() => navigate("/dashboard/programer/employee")}>
            <div>
              <div className='text-center pb-1'>
                <h4>Programers</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{programerCount}</h5>
              </div>
            </div>
          </div>
        </div>


        <div class="col-md-4 " >
          <div class="card card-3 h-[200px] justify-center"
          onClick={() => navigate("/dashboard/soundeffect/employee")}>
            <div>
              <div className='text-center pb-1'>
                <h4>Sound Effect</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <h5>Totali:</h5>
                <h5>{soundEffectCount}</h5>
              </div>
            </div>
          </div>
        </div>

        



      </div>

    </div>
  )
}


export default Home
