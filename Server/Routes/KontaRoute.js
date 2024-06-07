import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

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
  
  // ... other routes (omitted for brevity)
  
  // Admin Login (fixed)
  router.post("/kontalogin", async (req, res) => {
    try {
      const sql = "SELECT * FROM kontabilist WHERE username = ? AND password = ?";
      const [result] = await con.query(sql, [req.body.username, req.body.password]);
  
      if (result.length === 0) {
        return res.status(401).json({ loginStatus: false, Error: "Wrong username or password" });
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
  


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as KontaRouter };
