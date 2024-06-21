import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";
import fs from "fs"

// Setup express router
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Public/Images');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({
    storage: storage
  });






const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
  }
};


  
router.post('/create-team', (req, res) => {
  const { teamName } = req.body;

  console.log('Received request to create team:', teamName);

  const basePath = path.join(__dirname, '..', 'Puntoret', 'src', 'Components', 'Admin', `A${teamName}`);
  const files = ['File1.jsx', 'File2.jsx', 'File3.jsx', 'File4.jsx', 'File5.jsx', 'File6.jsx'];

  const boilerplateCode = (teamName, teamPath) => `
    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    const A${teamName} = () => {
        const navigate = useNavigate();

        const navigateToEmployee = () => {
            navigate('/dashboard/${teamPath}/employee');
        };

        return (
            <div>
                <h1>Hello from ${teamName}</h1>
                <button onClick={navigateToEmployee}>Go to Employee</button>
            </div>
        );
    };

    export default A${teamName};
`;



  try {
      ensureDirectoryExistence(basePath);

      files.forEach(file => {
          const filePath = path.join(basePath, file);
          fs.writeFileSync(filePath, boilerplateCode(teamName.toLowerCase()), 'utf8');
      });

      console.log('Team created successfully:', basePath);
      res.status(201).json({ message: 'Team created successfully' });
  } catch (error) {
      console.error('Error creating team:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});






  
  // ... other routes (omitted for brevity)
  
  // Admin Login (fixed)
  router.post("/adminlogin", async (req, res) => {
    try {
      const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
      const [result] = await con.query(sql, [req.body.email, req.body.password]);
  
      if (result.length === 0) {
        return res.status(401).json({ loginStatus: false, Error: "Wrong email or password" });
      }
  
      const email = result[0].email;
      const token = jwt.sign({ role: "admin", email: email, id: result[0].id }, "jwt_secret_key", { expiresIn: "1d" });
      res.cookie('token', token);
      return res.json({ loginStatus: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ loginStatus: false, Error: "Login failed" });
    }
  });

  router.post("/puntorlogin", async (req, res) => {
    try {
        const trimmedName = req.body.name.replace(/\s+/g, '');
        const sql = "SELECT * FROM users WHERE REPLACE(name, ' ', '') = ? AND password != '' AND password IS NOT NULL AND password = ?";
        const [result] = await con.query(sql, [trimmedName, req.body.password]);
    
        if (result.length === 0) {
            return res.status(401).json({ loginStatus: false, Error: "Wrong name or password" });
        }
    
        const { id, name, worker_id, team } = result[0];
        const token = jwt.sign({ role: "puntor", name: name, id: id, workerId: worker_id }, "jwt_secret_key", { expiresIn: req.body.remember ? "7d" : "1d" });
    
        // Set the cookie with different maxAge based on the remember me checkbox
        res.cookie('token', token, { httpOnly: true, maxAge: req.body.remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 }); // 7 days or 1 day
    
        return res.json({ loginStatus: true, userData: { id, name, worker_id, team } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ loginStatus: false, error: "Login failed" });
    }
});


  router.get("/password/:worker_id", async (req, res) => {
    const id = req.params.worker_id;
    const sql = "SELECT * FROM puntoretuji WHERE worker_id = ?";
  
    try {
      const [result] = await con.query(sql, [id]); // Use pool connection and prepared statement
      res.json({ Status: true, Result: result });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.json({ Status: false, Error: "Query Error" });
    }
  });

  router.put("/changepassword/:worker_id", (req, res) => {
    const id = req.params.worker_id;
    const sql = `UPDATE puntoretuji
        set password = ?
        Where worker_id = ?`;
    const values = [req.body.password];
    con.query(sql, [...values, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" + err });
      return res.json({ Status: true, Result: result });
    });
  });
  
  // Get Category (fixed)
  router.get('/category', async (req, res) => {
    try {
      const sql = "SELECT * FROM category";
      const [result] = await con.query(sql);
      return res.json({ Status: true, Result: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: "Query failed" });
    }
  });
  
  // Add Category (fixed)
  router.post('/add_category', async (req, res) => {
    try {
      const sql = "INSERT INTO category (cname) VALUES (?)";
      const [result] = await con.query(sql, [req.body.category]);
      return res.json({ Status: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: "Query failed" });
    }
  });
  
  // Add Employee with Image Upload (fixed)
  router.post('/add_employee', upload.single('image'), async (req, res) => {
    try {
      const sql = `INSERT INTO employee (name, email, password, address, salary, image, category_id) VALUES (?)`;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const values = [req.body.name, req.body.email, hashedPassword, req.body.address, req.body.salary, req.file ? req.file.filename : null, req.body.category_id];
      const [result] = await con.query(sql, [values]);
      return res.json({ Status: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: "Query failed" });
    }
  });
  
  // Get All Employees (fixed)
  router.get('/employee', async (req, res) => {
    try {
      const sql = "SELECT * FROM employee";
      const [result] = await con.query(sql);
      return res.json({ Status: true, Result: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: "Query failed" });
    }
  });

  router.get('/employee/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const sql = "SELECT * FROM employee WHERE id = ?";
      const [result] = await con.query(sql, [id]);
      return res.json({ Status: true, Result: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: `Error fetching employee: ${err.message}` });
    }
  });
  
  router.put('/edit_employee/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const sql = `UPDATE employee 
                   set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
                   Where id = ?`;
      const values = [req.body.name, req.body.email, req.body.salary, req.body.address, req.body.category_id, id];
      await con.query(sql, values);
      return res.json({ Status: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: `Error updating employee: ${err.message}` });
    }
  });
  

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?";
    con.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Status: false, Error: `Error deleting employee: ${err.message}` });
      }
      // Respond with the number of affected rows (should be 1 for successful delete)
      return res.json({ Status: true, Result: result.affectedRows });
    });
  });

  router.get('/gamedesign_count', async (req, res) => {
    try {
      const sql = "SELECT COUNT(id) AS count FROM programer";
      const [result] = await con.query(sql);
      return res.json({ Status: true, Result: { worker_count: result[0].count } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: `Error fetching programer count: ${err.message}` });
    }
  });
  
  router.get('/programer_count', async (req, res) => {
    try {
      const sql = "SELECT COUNT(id) AS count FROM programer";
      const [result] = await con.query(sql);
      return res.json({ Status: true, Result: { worker_count: result[0].count } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: `Error fetching programer count: ${err.message}` });
    }
  });
  
  

  router.get('/soundeffect_count', async (req, res) => {
    try {
      const sql = "SELECT COUNT(id) AS count FROM programer";
      const [result] = await con.query(sql);
      return res.json({ Status: true, Result: { worker_count: result[0].count } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Status: false, Error: `Error fetching programer count: ${err.message}` });
    }
  });
  
  

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
