import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import prisma from '../../db/prisma.js';
import asyncHandler from './asyncHandler.js';
dotenv.config();

const secret = process.env.JWT_SECRET;

const authenticateToken = asyncHandler(async(req, res, next) =>{
    const token = req.cookies.jwt;
    if(!token){
        res.status(401);
        throw new Error("Unauthorized, No token found!");
    }
    const decoded = jwt.verify(token, secret);
    //find user deselecting the password
    const user = await prisma.user.findFirst({
        where: {
            user_id: decoded.user_id
        },
        select: {
            user_id: true,
            username: true,
            email: true,
            user_type: true,
            registration_date: true
        }
    });
    if(!user){
        res.status(401);
        throw new Error("Unauthorized, No user found!");
    }
    req.user = user;
    next();
});

//Admin Middleware
const admin = asyncHandler(async(req, res, next) =>{
    if(req.user && req.user.user_type === "admin"){
        next();
    }else{
        res.status(401);
        throw new Error("Unauthorized as an admin!");
    }
});

//staff Middleware
const staff = asyncHandler(async(req, res, next) =>{
    if(req.user && req.user.user_type === "staff"){
        next();
    }else{
        res.status(401);
        throw new Error("Unauthorized as a staff!");
    }
})

export {authenticateToken, admin, staff};