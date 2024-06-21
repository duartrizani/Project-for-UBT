// src/Components/Admin/CreateTeam.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/create-team`, { teamName });
        if (response.status === 201) {
            navigate(`/dashboard/${teamName.toLowerCase()}`);
        }
    } catch (error) {
        console.error('Error creating team:', error);
        if (error.response) {
            console.error('Error details:', error.response.data);
        }
    }
};

  return (
    <div>
      <h1>Create a New Team</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Team Name:
          <input type="text" value={teamName} onChange={handleInputChange} />
        </label>
        <button type="submit">Create Team</button>
      </form>
    </div>
  );
};

export default CreateTeam;
