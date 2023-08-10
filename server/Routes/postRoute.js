require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const path = require("path")
const PostModel = require('../models/PostModel')
const fs = require('fs');
const defaultPath = 'public/Images/';
const app = express();
const router=express.Router();
const mailer=require('../Routes/mail');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({
    storage: storage
  })
  
  
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
  
  
  
  router.post('/create', verifyUser, upload.single('file'), (req, res) => {
    console.log(req.file);
    // const {title,desc}=req.body;
    // console.log(req.body);
    PostModel.create({ title: req.body.title, desc: req.body.desc, file: req.file.filename, email: req.body.email })
      .then(user => {
        res.json("Posted Successfully");
  
      })
      .catch(err => res.json(err))
  
  })
  
  
  router.get('/getPost', (req, res) => {
    // console.log("Posting request");
    PostModel.find()
      .then(data => res.json(data))
      .catch(err => console.log(err))
  })
  
  router.get('/getPostById/:id', (req, res) => {
    const id = req.params.id;
    console.log(id + " hello");
    //  res.json("testing");
    PostModel.findById({ _id: id })
      .then(post => {
        console.log(post);
        return res.json(post)
      })
      .catch(err => res.json(err));
  })
  
  router.put('/editPost/:id', verifyUser, upload.single('file'), (req, res) => {
    const id = req.params.id;
  
    // This is done if no new file is uploaded 
    if (!req.file) {
      PostModel.findOneAndUpdate({ _id: id }, { title: req.body.title, desc: req.body.desc })
        .then(user => {
  
          res.json("Updated Successfully");
        })
        .catch(err => console.log(err))
      return;
    }
  
    // It deletes the previous imagefile from the database .
    PostModel.findById({ _id: id })
      .then(user => {
        fs.unlink(defaultPath + user.file, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log('File deleted successfully');
          }
        });
        
      })
  
  // It inserts the new image file+Data into the database 
    PostModel.findOneAndUpdate({ _id: id }, { title: req.body.title, desc: req.body.desc, file: req.file.filename })
      .then(user => {
  
        res.json("Updated Successfully");
      })
      .catch(err => console.log(err))
  
  })
  
  router.delete('/deletePost/:id', (req, res) => {
    const id = req.params.id;
    PostModel.deleteOne({ _id: id })
      .then(user => res.json("Deleted Successfully"))
      .catch(err => res.json(err));
  })
  
module.exports = router ;