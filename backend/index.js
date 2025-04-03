// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
import path from "path"
dotenv.config({});

const _dirname = path.resolve()
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin: "https://chat-app-7vgc.onrender.com" ||  'http://localhost:5173',
    credentials:true
};
app.use(cors(corsOption)); 


// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 
app.use(express.static(path.join(_dirname, "/frontend/dist")))
// app.get('*',(_,res)=>{
//     // console.log(path.join(_dirname, "frontend", "dist", "index.html"));
//     res.sendFile(path.join(_dirname,"frontend","dist","index.html"))
// })
server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});
