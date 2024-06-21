
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(express.json());

app.post('/api/create-team', (req, res) => {
  const { teamName } = req.body;

  const teamFolderPath = path.join(process.cwd(), 'src', 'Components', 'Admin', `A${teamName}`);
  const files = ['File1.jsx', 'File2.jsx', 'File3.jsx', 'File4.jsx', 'File5.jsx', 'File6.jsx'];

  const boilerplateCode = (apiEndpoint, teamPath) => `
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Component = () => {
  const navigate = useNavigate();

  const navigateToEmployee = () => {
    navigate('/admin/${teamPath}/employee');
  };

  return (
    <div>
      <h1>Hello from ${teamName}</h1>
      <button onClick={navigateToEmployee}>Go to Employee</button>
    </div>
  );
};

export default Component;
`;

  // Create team folder
  if (!fs.existsSync(teamFolderPath)) {
    fs.mkdirSync(teamFolderPath);
  } else {
    return res.status(400).json({ message: 'Folder already exists' });
  }

  // Create JSX files with boilerplate code
  files.forEach(file => {
    const filePath = path.join(teamFolderPath, file);
    fs.writeFileSync(filePath, boilerplateCode(`/api/${teamName.toLowerCase()}`, teamName.toLowerCase()), 'utf8');
  });

  res.status(201).json({ message: 'Team created successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
