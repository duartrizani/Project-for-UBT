import React, { useEffect, useState } from 'react'
import '.././style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PuntorLogin = ({ setWorkerId }) => {
    const [values, setValues] = useState({
        name: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post(`${import.meta.env.VITE_API_URL}/auth/puntorlogin`, values)
        .then(result => {
          if (result.data.loginStatus) {
    
            const team = result.data.userData.team; //team = role
            switch (team) {
              case 'admin':
                localStorage.setItem("valid", true)
                    localStorage.setItem("role", "admin");
                    navigate('/dashboard')
                break;


              case 'gamedesign':
                localStorage.setItem("valid", true)
                    localStorage.setItem("role", "gamedesign");
                    navigate('/gamedesign')
                break;


              case 'kontabilist':
                localStorage.setItem("valid", true)
                  localStorage.setItem("role", "kontabilist");
                navigate('/kontabilist')
                break;


              default:
                localStorage.setItem('valid', true);
            localStorage.setItem('role', 'puntor');
            localStorage.setItem('workerId', result.data.userData.worker_id);
            setWorkerId(result.data.userData.worker_id);
                navigate('/datapuntoret');
                break;
            }
          } else {
            setError(result.data.Error);
          }
        })
        .catch(err => {
          setError("Emri ose Password janë gabim");
          console.log(err);
        });
    };

  useEffect(() => {
    if (error) {
      // Display error message for a short duration 
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    }
  }, [error]);


    return (
        <section className="bg-gray-50 dark:bg-gray-900 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className='font-semibold'>
                    {error && (
              <div className="font-semibold text-red-500">
                {error}
              </div>
            )}
                </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                                <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                                    onChange={(e) => setValues({ ...values, name: e.target.value })} />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                    onChange={(e) => setValues({ ...values, password: e.target.value })} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-slate-300 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PuntorLogin