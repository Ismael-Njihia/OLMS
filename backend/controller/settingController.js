import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";


const getAllSettings = asyncHandler(async (req, res) => {
    try {
        const settings = await prisma.setting.findMany();
        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//create a setting, has Id, user_id and price
//POST /api/settings/register
//private/admin
const createASetting = asyncHandler(async (req, res) => {
   const {price} = req.body;
   const updatedBy = req.user.user_id;

   //make sure user exists
    const userExists = await prisma.user.findFirst({
         where: {
              user_id: updatedBy
         }
    });

    if(!userExists){
         res.status(400).json({error: "User does not exist"});
         return;
    }
    if (!price) {
        res.status(400).json({ error: "Please enter price" });
        return;
    }
    if (price < 0) {
        res.status(400).json({ error: "Price cannot be negative" });
        return;
    }

    const setting = await prisma.setting.create({
        data:{
            price,
            updatedBy,
            id: '9902199'
        }
    });

    if(setting){
        res.status(201).json({
            price: setting.price,
            updatedBy: setting.updatedBy,
            id: setting.id
        })
    }
});

//edit a setting
//PUT /api/settings/:id
//private/admin
const editASetting = asyncHandler(async (req, res) => {
    const {price} = req.body;
    const updatedBy = req.user.user_id;
 
    //make sure user exists
     const userExists = await prisma.user.findFirst({
          where: {
               user_id: updatedBy
          }
     });
 
     if(!userExists){
          res.status(400).json({error: "User does not exist"});
          return;
     }
     if (!price) {
         res.status(400).json({ error: "Please enter price" });
         return;
     }
     if (price < 0) {
         res.status(400).json({ error: "Price cannot be negative" });
         return;
     }
 
     const setting = await prisma.setting.update({
         where:{
             id: req.params.id
         },
         data:{
             price,
             updatedBy
         }
     });
 
     if(setting){
         
         res.status(201).json({message: `New price set at ${price} KES`});
     }
 });


export { getAllSettings, createASetting, editASetting };