import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateSecondSinceEpoch from "../util/generateSecSinceEpoch.js";
import todaysDate from "../util/todaysDate.js";
import generateRandom from "../util/generateRandom.js";

const getAllOnline = asyncHandler(async (req, res) => {
    try {
        const online = await prisma.online.findMany(
            {
                include: {
                    user: true
                }
            }
        );
        res.json(online);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//Create Online Transaction
//POST /api/online/create
//private

const createOnline = asyncHandler(async (req, res) => {
    const user_id = req.user.user_id;
    const { cost, duration, book_id} = req.body;
    
    //convert cost to float of 2 decimal places
    const costFloat = parseFloat(cost);
     console.log(costFloat);
    let status = "ready";
    let startTime = generateSecondSinceEpoch();
    //The duration is in hours
    //We need to convert it to seconds and add to the startTime
    let durationInSeconds = duration * 3600;
    let stopTime = startTime + durationInSeconds;
    let transactionId = generateRandom()+ generateSecondSinceEpoch().toString();

    try {
        const online = await prisma.online.create({
            data: {
                transactionId,
                user_id,
                book_id,
                cost : costFloat,
                duration,
                status,
                startTime : startTime.toString(),
                stopTime : stopTime.toString()
            }
        });
        res.json(online);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }


});

export  {getAllOnline, createOnline};