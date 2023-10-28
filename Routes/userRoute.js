
require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const multer = require("multer")
const path = require("path")
const UserModel = require('../models/UserModel');
const { time, timeStamp, log } = require("console")
const mailer = require('../Routes/mail');
const base64url = require('base64-url') // This is used to encode the token ,in a way to be URL safe
const app = express();

const router = express.Router();

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

router.get('/check', verifyUser, (req, res) => {
    // console.log("hell    o 1");
    //  return res.json({email:req.email,username:req.username});
    return res.json({ email: req.email, name: req.name });

})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json("Logout Succesfully");
})

router.post('/register', async(req, res) => {
    const { username, email, password } = req.body;
    console.log(username + email + password);

    // if (!(username && email && password)) {
    //     res.json("Incomplete Details");
    //     // return;
    // }

   const user = await UserModel.findOne({ email });
   if (user) { res.json("User already Exists with this email");return ; }
       

    // Just creating ans hash of the password 
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name: username, email: email, password: hash })//it is also a asychronous operation .
                .then(user => {
                    console.log(user);
                    const token = jwt.sign({ email: user.email, name: user.name }, "jwt-secret-key", { expiresIn: '1d' })
                    res.cookie('token', token);
                    console.log(token);

                    mailer(user.email, "You are successfuly Registered")
                        .then(res => console.log("message sent successfully"))
                        .catch(err => console.log(err))

                    res.json("Registeration Successfull")
                })
                .catch(err => res.json(err+"    2323here "))
        })
        .catch(err => console.log(err))
})

router.post('/login', (req, res) => {
    const { username, email, password } = req.body;
    // console.log(email + "65");
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        // console.log(user.name + " 71");
                        const token = jwt.sign({ email: user.email, name: user.name }, "jwt-secret-key", { expiresIn: '1d' })// json token generation to maintain session
                        // console.log(token + "::");

                        res.cookie('token', token) // store the token into a cookie .
                        // return res.cookie("token", token).status(200).send("Registration Successfully");

                        // mailer(user.email, "You are successfuly Registered")
                        //     .then(res => console.log("message sent successfully"))
                        //     .catch(err => console.log(err))
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
        .catch(err => console.log(err));

})

router.post("/forgotPass", async (req, res) => {
    const { email } = req.body;
    UserModel.findOne({ email: email })
        .then(async user => {
            if (user) {
                const id = user._id;
                const token = jwt.sign({ id: id }, "jwt-secret-key", { expiresIn: "1500s" });
                console.log(token);

                const encodedToken = base64url.encode(token);
                console.log(encodedToken);
                // const token ="hello reset"
                const setusertoken = await UserModel.findByIdAndUpdate({ _id: id }, { verifytoken: encodedToken }, { new: true });
                const string = `This Link Valid For 2 MINUTES https://codershub-pczs.onrender.com/reset-password/${id}/${encodedToken}`;
                mailer(email, string)
                    .then(fun => {
                        console.log("Reset mail Sent");
                        return res.json("RESET mail Send Successfully");
                    })
                    .catch(err => { console.log("Some error") })

            }
            else {
                return res.json("User Don't Exist");
            }
        })
        .catch(err => console.log(err))

})

router.get("/check/:id/:token", async (req, res) => {
    const { id } = req.params;
    const { token } = req.params;
    // console.log(id +" 3434 " + token );
    UserModel.findById({ _id: id })
        .then(user => {
            if (user) {
                // console.log("hell");
                const decodedToken = base64url.decode(token);
                const validToken = jwt.verify(decodedToken, "jwt-secret-key");

                // console.log(validToken);

                if (user.verifytoken === token && validToken.id)
                    return res.json("USER VALID");
            }
            return res.json("USER INVALID")
        })
        .catch(err => console.log(err))

})

router.post("/updatePass/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const updatePass = req.body.password;
    const decodedToken = base64url.decode(token);
    const validToken = jwt.verify(decodedToken, "jwt-secret-key");
    const user = await UserModel.findById({ _id: id })
    console.log(validToken);
    log(updatePass);
    if (user.verifytoken === token && validToken.id) {
        bcrypt.hash(updatePass, 10)
            .then(newPass => {

                UserModel.findByIdAndUpdate({ _id: id }, { password: newPass })
                    .then(fun => { return res.json("UPDATED PASSWORD"); })
                    .catch(err => { console.log(err); return res.json("UPDATE FAILED") })
            })
            .catch(err => console.log(err))
    }

})



module.exports = router;