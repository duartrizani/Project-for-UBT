import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import Heroicons



const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate(); // Use navigate hook from React Router


  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name,
      email,
      message,
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      setFormSubmitted(true);
      setTimeout(() => navigate('/'), 3000);

    }, (error) => {
      console.error('FAILED...', error);
    });

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <ArrowLeftIcon
            className="h-6 w-6 text-gray-700 cursor-pointer mr-2"
            onClick={() => navigate(-1)} // Navigate back to the previous page
          />
        <div className="flex items-center mb-6">
          
          <h2 className="text-2xl font-bold text-center flex-grow">Contact Us</h2>
        </div>
        <div className="form-group mb-4 w-[300px]">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Emri</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='Emri'
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder='Mesazhi'
            className="h-[100px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Send Message
        </button>
        {formSubmitted && <p className="mt-4 text-green-500 text-center">Your message has been sent!</p>}
      </form>
    </div>
  );
};

export default ContactForm;
