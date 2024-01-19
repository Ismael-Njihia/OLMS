import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateRandom from "../util/generateRandom.js";
import generateSecondSinceEpoch from "../util/generateSecSinceEpoch.js";
import todaysDate from "../util/todaysDate.js";
import encryptPassword from "../util/encryptPassword.js";
import decryptPassword from "../util/decryptPassword.js";
import generateToken from "../util/generateToken.js";

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
    
    const user_type = "user";
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
       //generate the token
       generateToken(res, user.user_id);
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
        res.status(400).json({ error: "Please fill in all fields" });
        
    }

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });
    if(!user){
        res.status(400).json({ error: "Invalid Credentials" });
        return;
    }
    //compare the password with the encrypted password
    const isMatch = await decryptPassword(password, user.password);
    if(!isMatch){
        res.status(400).json({ error: "Invalid Credentials" });
        return;
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
    res.cookie("jwt", "",{
        expires: new Date(0),
        httpOnly: true
    })
    res.status(201).json({
        message: "User logged out successfully"
    })
})

//get a user by id
//GET /api/users/:id
//private
const getUserById = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const user = await prisma.user.findFirst({
        where: {
            user_id: id
        }
    });
    if(!user){
        res.status(400);
        throw new Error("User not found");
    }
    res.status(201).json({
        first_name: user.first_name,
        last_name: user.last_name,
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        user_type: user.user_type,
        registration_date: user.registration_date,
    })
})

//link user with transaction table - borrower_id
//GET /api/users/transactions/:id
//private
const getUserTransactions = asyncHandler(async (req, res) => {
    const {id} = req.params;
    console.log(id + "looking for transactions");

    const user = await prisma.user.findFirst({
        where: {
            user_id: id
        }
    });
    if(!user){
        res.status(400);
        throw new Error("User not found");
    }
    const transactions = await prisma.transaction.findMany({
        where: {
            borrower_id: id
        }
    });
    res.status(201).json({
        transactions
    })
})



export {getAllUsers, registerUser, loginUser, logoutUser, getUserById, getUserTransactions};