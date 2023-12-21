import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prisma from '../../db/prisma.js';
import asyncHandler from './asyncHandler.js';
dotenv.config();

const secret = process.env.JWT_SECRET;

const authenticateToken = asyncHandler(async(req, res, next) =>{
    const token = req.cookies.jwt;
    
    if(!token){
        res.status(401).json({ error: "Unauthorized, No token found!" });
        return;
    }
    try {
        const decoded = jwt.verify(token, secret);
       
        const user = await prisma.user.findFirst({
            where: {
                user_id: decoded.user_id
            },
            select:{
                user_id: true,
                username: true,
                email: true,
                user_type: true,
                registration_date: true,
            }
        });
        if(!user){
            res.status(404).json({ error: "User not found" });
            return;
        }
        req.user = user;
        next();
        
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Unauthorized, Invalid token!" });
        
    }
});

//Admin Middleware
const admin = asyncHandler(async(req, res, next) =>{
    if(req.user && req.user.user_type === "admin"){
        next();
    }else{
        res.status(401).json({ error: "Unauthorized as an admin!" });
       return;
    }
});

//staff Middleware
const staff = asyncHandler(async(req, res, next) =>{
    if(req.user && req.user.user_type === "staff"){
        next();
    }else{
        res.status(401).json({ error: "Unauthorized as a staff!" });
         return;
        
    }
})

export {authenticateToken, admin, staff};