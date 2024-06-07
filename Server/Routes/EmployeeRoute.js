import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/employee_login", async (req, res) => {
  try {
    const email = req.body.email;

    // Check if email exists
    const sql = "SELECT * from employee Where email = ?";
    const [result] = await con.query(sql, [email]);

    if (result.length === 0) {
      return res.json({ loginStatus: false, Error: "Invalid email or password" });
    }

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(req.body.password, result[0].password);
    if (!isPasswordValid) {
      return res.json({ loginStatus: false, Error: "Invalid email or password" });
    }

    // Generate JWT on successful login
    const token = jwt.sign(
      { role: "employee", email: email, id: result[0].id },
      "jwt_secret_key",
      { expiresIn: "1d" }
    );

    res.cookie('token', token);
    return res.json({ loginStatus: true, id: result[0].id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ loginStatus: false, Error: "Internal server error" });
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?";
    const [result] = await con.query(sql, [id]);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false });
  }
});
  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {router as EmployeeRouter}