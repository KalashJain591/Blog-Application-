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
const app = express();
const PORT = 3001
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  method: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}))

mongoose.connect("mongodb://127.0.0.1:27017/Blog");
app.use(express.static('public')); // It is used to grant access to the static public folder to access the images .
// It is a middleware function which returns the username and email information.
const verifyUser = (req, res, next) => {

  const token = req.cookies.token;
  // console.log(token +" verify User");

  if (!token)
    return res.json("No Token Found");
  else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err)
        return res.json("The Token is Wrong");
      else {
        req.email = decoded.email;
        req.name = decoded.name;
        // console.log("hello : " + req.name);
        next();
      }
    });
  }
};


// This is to check if the user is logged in or not   
app.get('/', verifyUser, (req, res) => {
  // console.log("hell    o 1");
  //  return res.json({email:req.email,username:req.username});
  return res.json({ email: req.email, name: req.name });

})

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json("Logout Succesfully");
})

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!(username && email && password))
    return res.json("Incomplete Details");
  // Just creating ans hash of the password 
  bcrypt.hash(password, 10)
    .then(hash => {
      UserModel.create({ name: username, email: email, password: hash })//it is also a asychronous operation .
        .then(user => {
          console.log(user);
          const token = jwt.sign({ email: user.email, name: user.name }, "jwt-secret-key", { expiresIn: '1d' })
          res.cookie('token', token);
          console.log(token);
          res.json("Registeration Successfull")
        })
        .catch(err => res.json(err))
    })
    .catch(err => console.log(err))
})


app.post('/login', (req, res) => {
  const { username, email, password } = req.body;
  console.log(email + "65");
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            console.log(user.name + " 71");
            const token = jwt.sign({ email: user.email, name: user.name }, "jwt-secret-key", { expiresIn: '1d' })// json token generation to maintain session
            console.log(token + "::");

            res.cookie('token', token) // store the token into a cookie .
            // return res.cookie("token", token).status(200).send("Registration Successfully");


            // console.log(res.cookie);
            return res.json("Login Successful");
          }
          else {
            return res.json("Password is incorrect");
          }
        })

      }
      else {
        res.json("USER NOT EXIST");
      }
    })


})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images')
  },
  filename: (req,file,cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})


app.post('/create', verifyUser, upload.single('file'), (req, res) => {
  console.log(req.file);
  // const {title,desc}=req.body;
  // console.log(req.body);
  PostModel.create({title:req.body.title,desc:req.body.desc,file:req.file.filename})
  .then(user=>{
    res.json("Posted Successfully");

  })
  .catch(err=>res.json(err))

})


app.get('/getPost',(req,res)=>{
  // console.log("Posting request");
   PostModel.find()
   .then(data=>res.json(data))
   .catch(err=>console.log(err)) 
})

app.get('/getPostById/:id',(req,res)=>{
 const id=req.params.id;
 console.log(id +" hello");
//  res.json("testing");
 PostModel.findById({_id:id})
 .then(post=>{
  console.log(post);
  return res.json(post)
})
 .catch(err=>res.json(err));
})

app.listen(PORT, () => {
  console.log(`Connected to PORT ${PORT}`);
})