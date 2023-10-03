require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const path = require("path")
const UserModel = require('./models/UserModel');
const PostModel = require('./models/PostModel')
const { time, timeStamp, log } = require("console")
const fs = require('fs');
const passport=require("passport");
const cookieSession=require("cookie-session");
const passportSetup=require("./Passport");
const authRoute=require('./Routes/auth');
const defaultPath = 'public/Images/';
const PORT = process.env.PORT ||3001||8080
const app = express();
const userRoute=require('./Routes/userRoute');
const postRoute=require('./Routes/postRoute');
app.use(express.json());
app.use(cookieParser());

app.use(cookieSession({
  name:"session",
  keys:["kalash"],
  maxAge:24*60*69*100,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  method: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}))

app.get("/test",(req,res)=>{
  res.send("This is testing route");
})
app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/post',postRoute);
mongoose.connect(process.env.MONGO_URL)
// mongoose.connect("mongodb://127.0.0.1:27017/Blog");
// app.use(express.static('public')); // It is used to grant access to the static public folder to access the images .
app.listen(PORT, () => {
  console.log(`Connected to PORT ${PORT}`);
})


app.use(express.static('client/dist'));
 app.get('*', (req, res) => {
    res.sendFile(path.resolve('client','dist','index.html'));
});