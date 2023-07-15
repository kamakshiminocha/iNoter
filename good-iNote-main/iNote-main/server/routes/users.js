const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const JWT_SECRET="shhhh"
dotenv.config()

const router = express.Router()

// @desc Create new User
// @route POST /users/createuser
// @access Private

router.post('/createuser', async (req,res) => {
    try {
        //Check if email already exists
        let success= false;
        const {_email,password} = req.body
        console.log(req.body);
        const email = await User.find({email:req.body.email})
        
        if(email.length!=0){
            success = true;
        }
        
        if(success)
        {
            return res.status(400).json({success:false,error: "Email already exists"})
        }

        //If email does not exist create user
        //Secure Password by adding salt and hashing it
        const salt = await bcrypt.genSalt(10)
        const sec_pass = await bcrypt.hash(req.body.password,salt)


        let user = await User.create({
            name: req.body.name,
            username: req.body.name,
            password: sec_pass,
            email: req.body.email,
        })

        //Give user an Auth Token
        let data = {
            user: {
                id: user.id
            }
        }

        const authtoken = await jwt.sign(data,JWT_SECRET)

        res.status(200).json({success:true,authtoken})

    } catch (error) {
        res.status(500).json({success:false,err:"Internal Server Error",error})
    }
})

// @desc Login User
// @route POST /users/login
// @access Private

router.post('/login', async (req,res)=> {
    try {
        const {email,password} = req.body
        const success = false

        //Find User from database
        const user = await User.findOne({email})
console.log("loggginin",user);
        //Check if user exists
        if(!user)
        {
            console.log(email,password);
            return res.json({success:false,error: "Invalid Credentials"})
        }

        const comparepassword = await bcrypt.compare(password,user.password)

        if(!comparepassword){
            console.log("pwd wring");
            return res.json({success:false,error: "Invalid passwd Credentials"})
        }

        //Give user an Auth Token
        let data = {
            user: {
                id: user.id
            }
        }

        const authtoken = await jwt.sign(data,JWT_SECRET)

        res.status(200).json({success:true,authtoken})

    } catch (error) {
        res.status(500).json({success:false,error:"Internal Server Error"})
    }
})

// @desc Update User
// @route POST /users/updateuser
// @access Private

module.exports = router