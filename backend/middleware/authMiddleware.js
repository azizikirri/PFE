// in this middleware we check the existance of the cookie 
import jwt  from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";

const protect = asyncHandler(async(req,res,next)=>{
    let token ;
    token = req.cookies.token;
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = await User.findById(decoded.userId).select('-password') 
            
            next();
            
        }catch(err){
            res.status(401)
            throw new Error('not authorized, invalid token')
        }
    }else{
        res.status(401)
        throw new Error('not authorized, no token')
    }
})

export {protect}