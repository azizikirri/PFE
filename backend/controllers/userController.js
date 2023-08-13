import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Quiz from '../models/QuizModel.js'

// auth user/set token 
// route POST /api/users/auth
// access Public
// LOGIN
const authUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password)) ){
        generateToken(res, user._id)

        res.status(201).json({
            _id:user._id,
            nom:user.nom,
            prenom:user.prenom,
            email:user.email,
        })
    }else{
        res.status(401)
        throw new Error('invalid email or password')
    }
})
// register user
// route POST /api/users
// access Public
// sign iN
const registerUser = asyncHandler(async (req,res)=>{
    const {nom,prenom,email,password} = req.body;
    const userExist = await User.findOne({email: email})
    if(userExist){
        res.status(400)
        throw new Error('this user already exist ')
    }

    // save new user 
    const user = await User.create({
        nom,
        prenom,
        email,
        password
    })
    if (user){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            nom:user.nom,
            prenom:user.prenom,
            email:user.email,
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }

})
// logout
// route POST /api/users/logout 
// access Public
const logoutUser = asyncHandler(async (req,res)=>{
    
    res.cookie('token','',{
        httpOnly:true,
        expires: new Date(0)
    })
    
    res.status(200).json({ message : 'Logged Out'})
})
// get user profile 
// route GET /api/users/profile 
// access Private
const getUserProfile = asyncHandler(async (req,res)=>{
    const user = {
        _id : req.user_id,
        nom: req.user.nom,
        prenom : req.user.prenom,
        email: req.user.email
    }
    // console.log(req.user);
    res.status(200).json(user)
})
// update user profile 
// route PUT /api/users/profile 
// access Private
const updateUserProfile= asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    const oldE = user.email
    if(user){
        user.nom = req.body.nom || user.nom;
        user.prenom = req.body.prenom || user.prenom;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save()
        
        const quizUserEmail = await Quiz.updateMany({quizCreatorEmail:oldE},{quizCreatorEmail:req.body.email || user.email})

        res.status(200).json({
            _id:updatedUser._id,
            nom:updatedUser.nom,
            prenom:updatedUser.prenom,
            email:updatedUser.email,
        })

    }else{
        res.status(404)
        throw new Error('user not found')
    }
    res.status(200).json({ message : 'update user'})
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
}