import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateRandom from "../util/generateRandom.js";
import generateSecondSinceEpoch from "../util/generateSecSinceEpoch.js";
import todaysDate from "../util/todaysDate.js";
import encryptPassword from "../util/encryptPassword.js";
import decryptPassword from "../util/decryptPassword.js";
import generateToken from "../util/generateToken.js";
import jwt from "jsonwebtoken";

const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

//creating a user
//POST /api/users/register
//public
const registerUser = asyncHandler(async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    //check if there are null values
    if(!first_name || !last_name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all fields");
    }
    const userExists = await prisma.user.findFirst({
        where: {
            email: email
    }
});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    //create username and unique id
    let  username = first_name + last_name
    
    const usernameExists = await prisma.user.findFirst({
        where:{
            username: username
        }
    });

    if(usernameExists){
        username = username.substring(0, 15) + generateRandom();
    }
    const user_idINT = generateSecondSinceEpoch() + generateRandom();
    //change the user_id to a string
    const user_id = user_idINT.toString();
    //encrypt the password
    const encryptedPassword = await encryptPassword(password);  
    
    const user_type = "admin";
    const registration_date = todaysDate().toString();
    const user = await prisma.user.create({
        data: {
            user_id,
            username,
            password: encryptedPassword,
            first_name,
            last_name,
            email,
            user_type,
            registration_date
        }
    });
    if(user){
        res.status(201).json({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            user_type: user.user_type,
            registration_date: user.registration_date,
            token: null
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
})

//login a user
//POST /api/users/login
//public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if(!user){
        res.status(400);
        throw new Error("Invalid Credentials");
    }
    //compare the password with the encrypted password
    const isMatch = await decryptPassword(password, user.password);
    if(!isMatch){
        res.status(400);
        throw new Error("Invalid Credentials");
    }

    //generate the token
    generateToken(res, user.user_id);
    res.status(201).json({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        user_type: user.user_type,
        registration_date: user.registration_date,
    })
})

//logout a user
//GET /api/users/logout
//private

const logoutUser = asyncHandler(async (req, res) => {
    //refer the user logged out with email
    const token = req.cookies.jwt;
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    const user = await prisma.user.findFirst({
        where: {
            user_id: decoded.user_id
        }
    });
    const first_name = user.first_name;
    const last_name = user.last_name;
    //logout the user
    res.cookie("jwt", "logout", {
        maxAge: 1
    });
    res.status(200).json({
        message: `Goodbye ${first_name} ${last_name}! You have been logged out successfully!`
    })
})



export {getAllUsers, registerUser, loginUser, logoutUser};