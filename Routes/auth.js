const router = require("express").Router();
const passport = require("passport");
const UserModel = require('../models/UserModel')
const cookieSession=require("cookie-session");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.get("/login/success", (req, res) => {
    if (req.user) {
        console.log(req.user._json);
        const email=req.user._json.email;
        const password="123";
        const name=req.user._json.name;

        UserModel.findOne({  email:email })
            .then(user => {
                if (user) {
                    bcrypt.compare(password, user.password, (err, response) => {
                        if (response) {
                            // console.log(user.name + " 71");
                            const token = jwt.sign({ email: user.email, name: user.name }, "jwt-secret-key", { expiresIn: '1d' })// json token generation to maintain session
                            // console.log(token + "::");

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
            .catch(err=>{console.log("not found member ")})


        // res.status(200).json({
        //     error:false,
        //     message:"login Successfully",
        //     user:req.user,
        // })
    }
    else {
        res.status(403).json({
            error: true,
            message: "Not Authorised"
        })
    }
})

router.get("/login/failed", (req, res) => {
    res.status(401).json({ error: true, message: "login Failure" });
})

// router.get("/google/callback",
//     passport.authenticate("google", {
//         successRedirect: process.env.CLIENT_URL,
//         failureRedirect: "/login/failed",
//     }))

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
})

module.exports = router;