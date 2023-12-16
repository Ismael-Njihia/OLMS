import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateSecondSinceEpoch from "../util/generateSecSinceEpoch.js";
import generateRandom from "../util/generateRandom.js";

const getAllGenres = async (req, res) => {
    const genres = await prisma.genre.findMany();
    res.json(genres);
};

//creating a genre
//POST /api/genres/register
//private
//used by admin and staff
const registerGenre = asyncHandler(async (req, res) => {
    const {genre_name, user_id} = req.body;

    if(!genre_name){
        res.status(400);
        throw new Error("The genre name needs to be specified");
    }

    const genre_idINT = generateSecondSinceEpoch() + generateRandom();
    const genre_id = genre_idINT.toString();

    const todaysDate = new Date();

    const genre = await prisma.genre.create({
        data: {
            genre_id,
            genre_name,
            user_id,
            added_on: todaysDate
        }
    })
    res.json(genre);

    if(!genre){
        res.status(400);
        throw new Error("The genre could not be created");
    }

    
})


export { getAllGenres, registerGenre}