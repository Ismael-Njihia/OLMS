import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateRandom from "../util/generateRandom.js";
import generateSecondSinceEpoch from "../util/generateSecSinceEpoch.js";
import todaysDate from "../util/todaysDate.js";

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
    const user_type = "user";
    const registration_date = todaysDate();
    const user = await prisma.user.create({
        data: {
            user_id,
            username,
            password,
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



export {getAllUsers, registerUser};