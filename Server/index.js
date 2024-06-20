import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { GameDesignRouter } from "./Routes/GameDesignRoute.js";
import { KontaRouter } from "./Routes/KontaRoute.js";
import { ProgramerRouter } from "./Routes/ProgramerRoute.js";

const app = express() 
app.use(cors({
    origin: ["https://duartrizani.site","http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE", "CREATE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth', adminRouter)
app.use('/employee', EmployeeRouter)
app.use('/krye', GameDesignRouter)
app.use('/konta', KontaRouter)
app.use('/prog', ProgramerRouter)
app.use(express.static('Public'))

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        Jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
}
app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
} )

app.listen(3000, () => {
    console.log("Server is running")
})