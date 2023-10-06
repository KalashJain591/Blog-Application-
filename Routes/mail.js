const express = require('express');
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const router = express.Router();
// router.post('/user',(req,res)=>{
const mailer = async (arg , content) => {
  console.log("reached on start of email")

  const user = arg;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thekalash52@gmail.com',
      pass: 'jija tobj tcnv kjtz'
    }
  });

  var mailOptions = {
    from: 'thekalash52@gmail.com',
    to: arg,
    subject: content,
    text: content
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("email " + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


}


module.exports = mailer;