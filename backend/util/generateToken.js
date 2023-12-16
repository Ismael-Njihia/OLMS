import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (res, user_id) =>{
    const token = jwt.sign({user_id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    })

   res.cookie("jwt", token,{
         httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
        sameSite:'strict'
   })
}

export default generateToken;
