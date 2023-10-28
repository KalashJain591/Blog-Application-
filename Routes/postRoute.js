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
const UserModel = require('../models/UserModel');
const fs = require('fs');
const defaultPath = 'public/Images/';
const app = express();
const router = express.Router();
const mailer = require('../Routes/mail');
const Key = process.env.JWT_SECRET_KEY;
const default_image = "https://firebasestorage.googleapis.com/v0/b/blog-app-6ac9e.appspot.com/o/images%2Ftemp.jpeg?alt=media&token=1ae15ed8-e6a8-4310-9daa-3537953bc1c2";
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'public/Images')
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
//   })

// const upload = multer({
//   storage: storage
// })

console.log(process.env.JWT_SECRET_KEY)
const verifyUser = (req, res, next) => {

  const token = req.cookies.token;
  // console.log(token +" verify User");

  if (!token)
    return res.json("No Token Found");
  else {
    jwt.verify(token, Key, (err, decoded) => {
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




router.post('/create', verifyUser, async (req, res) => {

  // if User don't upload any image
  if (req.body.imgLink === undefined)
    req.body.imgLink = default_image;

  // console.log(req.body.imgLink);

  const user = await UserModel.findOne({ email: req.body.email });




  PostModel.create({ title: req.body.title, desc: req.body.desc, email: req.body.email, displayText: req.body.displayText, imgLink: req.body.imgLink, name: user.name, createOn: new Date(), updateOn: new Date(), category: req.body.category })
    .then(user => {
      res.json("Posted Successfully");
    })
    .catch(err => res.json(err))
})


router.get('/getPost', (req, res) => {
  PostModel.find()
    .then(data => res.json(data))
    .catch(err => console.log(err))
})

router.get('/getPostById/:id', (req, res) => {
  const id = req.params.id;
  PostModel.findById({ _id: id })
    .then(post => {
      // console.log(post);
      return res.json(post)
    })
    .catch(err => res.json(err));
})

// router.put('/editPost/:id', verifyUser, upload.single('file'), (req, res) => {
router.put('/editPost/:id', verifyUser, (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  // This is done if no new file is uploaded 
  if (req.body.imgLink === null) {
    // console.log("link not found");
    PostModel.findOneAndUpdate({ _id: id }, { title: req.body.title, desc: req.body.desc, updateOn: new Date(), category: req.body.category, displayText: req.body.displayText })
      .then(user => {

        res.json("Updated Successfully");
      })
      .catch(err => console.log(err))
    return;
  }


  // It inserts the new image file+Data into the database 
  PostModel.findOneAndUpdate({ _id: id }, { title: req.body.title, desc: req.body.desc, imgLink: req.body.imgLink, updateOn: new Date(), displayText: req.body.displayText })
    .then(user => {
      console.log("link found");
      // res.json("Updated Successfully");
    })
    .catch(err => console.log(err + "Error occured here "))
  res.json("Updated Successfully");
})

router.delete('/deletePost/:id', (req, res) => {
  const id = req.params.id;
  PostModel.deleteOne({ _id: id })
    .then(user => res.json("Deleted Successfully"))
    .catch(err => res.json(err));
})

router.put('/likePost/:id', verifyUser, (req, res) => {
  let postID = req.params.id;
  let userEmail = req.body.email;
  console.log(userEmail);
  PostModel.findByIdAndUpdate(postID, { $push: { likes: userEmail } }, { new: true })
    .then(data => res.json(data))
    .catch(err => { console.log("Error in likePost: " + err) })

})

router.put('/unlikePost/:id', verifyUser, (req, res) => {
  let postID = req.params.id;
  let userEmail = req.body.email;
  PostModel.findByIdAndUpdate(postID, { $pull: { likes: userEmail } }, { new: true })
    .then(data => res.json(data))
    .catch(err => { console.log("Error in unlikePost: " + err) })
})
// let d=new Date()
// console.log(d.getDate()+"/" +d.getMonth()+"/"+d.getFullYear());
router.post('/addcomment/:id', verifyUser, (req, res) => {
  let postID = req.params.id;
  let userEmail = req.body.email;
  let userName = req.body.name;
  let comment = req.body.comment;
  let d = new Date();
  let date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()

  PostModel.findByIdAndUpdate(postID, { $push: { comments: { PostedBy: userName, PostedOn: date, Desc: comment, author: userEmail } } })
    .then((data) => { res.json(data.comments[data.comments.length - 1]); console.log("Succes comment"); })
    .catch((err) => console.log("error in AddComment " + err))
})

router.put('/deleteComment/:id', async (req, res) => {
  let userEmail = req.body.email;
  let PostId = req.params.id;
  let commentId = req.body.cid;
  console.log(userEmail);
  console.log("reached");
  PostModel.findByIdAndUpdate(PostId, { $pull: { comments: { _id: commentId } } })
    .then((data) => { res.json("Succesfully deleted comment"); console.log(data); })
    .catch((err) => console.log("error in deleteComment " + err))

})

router.put('/EditComment/:id', async (req, res) => {
  let postID = req.params.id;
  let commentId = req.body.cid;
  // console.log(commentId);
  let comment = req.body.comment;
  // console.log(postID);
  PostModel.findById({ _id: postID })
    .then((res) => {
      // console.log(res.comments);
      let idx = res.comments.findIndex(obj => obj._id == commentId)
      // console.log(idx);
      // console.log(res.comments[idx]);
      res.comments[idx].Desc = comment;
      // console.log(res.comments[idx]);
    })
    .catch(er => { console.log("hellooooo " + er) })
  // console.log("hell");
  // console.log(Arr);

})


module.exports = router;