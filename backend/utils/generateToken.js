import jwt from 'jsonwebtoken'

const generateToken = (res, userId)=>{

    // create the token 
    const token = jwt.sign({ userId }
        ,process.env.JWT_SECRET,
        {
        expiresIn: '3d' //3 days to expire !
    })

    // save it in the cookie
    res.cookie('token',token,{
        httpOnly : true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite:'strict', //prevent scrf atacks
        maxAge: 3 * 24 * 60 * 60 * 1000 
    })

}

export default generateToken;