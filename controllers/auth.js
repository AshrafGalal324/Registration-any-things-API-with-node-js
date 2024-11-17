import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
//import { verifyToken } from "../utils/verifyToken.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    //res.status(200).send("User has been created.");
    

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        country: newUser.country,
        img: newUser.img,
        city: newUser.city,
        phone: newUser.phone,
        password: newUser.password,



      },
      
      
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  const {username,password}=req.body;

    if(!username && !password){
        return res.json("username and password is required");
    }
    const user=await User.findOne({username:username});
    if(!user){
        return res.json("username is required");
    }
    const matchedPassword=await bcrypt.compare(password,User.password)
    

    if(user && matchedPassword){
        const token=await jwt.sign({username:newUser.username,id:newUser._id},process.env.JWT,{expiresIn:'1m'});
        return res.json({status:"ok",data:{token}})
    }
    else{
        return res.json("an error");
    }
};
