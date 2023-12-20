import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateRandom from "../util/generateRandom.js";
import generateSecondSinceEpoch from "../util/generateSecSinceEpoch.js";
import todaysDate from "../util/todaysDate.js";

const getAllTransactions = async (req, res) => {
    const transactions = await prisma.transaction.findMany({
        include: {
            user: true,
            book: true,
        }
    });
    
    res.json(transactions);
};

//creating a transaction
//POST /api/transactions/register
//private
//used by admin and staff
const registerTransaction = asyncHandler(async (req, res) => {
    const {borrower_id, book_id, cost, staff_id} = req.body; 
    const borrow_date = todaysDate().toString();
    //example of borrow_date is "borrow_date": "1703075955975",
    //example of expected_return_date is "expected_return_date": "1705687755975",
    //add 7 days to the borrow_date for expected_return_date

    const expected_return_date = (todaysDate() + 604800000).toString();
    const return_date = null;
    const status = "borrowed";
    const fine = 0.0;
    console.log(borrow_date);
    if(!borrower_id){
        res.status(400);
        throw new Error("The borrower needs to be specified");
    }
    if(!staff_id){
        res.status(400);
        throw new Error("The staff needs to be signed In");

    }
    //check If there are enough copies of the book where the available_copies is greater than 0
    const bookExists = await prisma.book.findUnique({
        where: {
            book_id: book_id
        }
    })
    if(!bookExists){
        res.status(400);
        throw new Error("The book does not exist");
    }
    if(bookExists.available_copies <= 0){
        res.status(400);
        throw new Error("There are no available copies of the book");
    }

    const transactionIdINT = generateSecondSinceEpoch() + generateRandom();
    const transaction_id = transactionIdINT.toString();

    //make sure the transaction does not exist
    const transactionExists = await prisma.transaction.findUnique({
        where: {
            transation_id: transaction_id
        }})
    if(transactionExists){
        res.status(400);
        throw new Error("The transaction already exists");
    }
    //make sure the borrower exists
    const borrowerExists = await prisma.user.findUnique({
        where: {
            user_id: borrower_id
        }})
    if(!borrowerExists){
        res.status(400);
        throw new Error("No Such borrower does not exist");
    }
    //Create the Transaction
    const transaction = await prisma.transaction.create({
        data: {
            transation_id: transaction_id,
            borrower_id,
            book_id,
            borrow_date,
            expected_return_date,
            return_date,
            cost,
            status,
            fine,
            staff_id
        }
    })
    if(transaction){
        //update the book table
        const book = await prisma.book.update({
            where: {
                book_id: book_id
            },
            data: {
                available_copies: bookExists.available_copies - 1
            }
        })
        if(!book){
            res.status(400);
            throw new Error("The book could not be updated");
        }
        res.status(201).json({
            transaction_id,
            borrower_id,
            book_id,
            borrow_date,
            expected_return_date,
            return_date,
            cost,
            status,
            fine,
            staff_id,
            book
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid transaction data");
    }
});
//update a transaction
//PUT /api/transactions/:id
//private
const updateTransaction = asyncHandler(async(req,res)=>{

})
//mark transaction as returned
//PUT api/transactions/:id
//private
//also update available_copies of books to +1
const transactionReturned = asyncHandler(async(req,res)=>{
    const {id}= req.params;

    //check if it exists
    const transaction = await prisma.transaction.findUnique({
        where:{
            transation_id: id,
        },
    });

    if(!transaction){
        res.status(404);
        throw new Error("No such Transaction Available")
    }
    if(transaction.status === "returned"){
        res.status(400);
        throw new Error("Transaction is already done");
    }
    const updatedTransaction = await prisma.transaction.update({
        where:{
            transation_id: id,
        },
        data:{
            status: "returned",
            return_date: new Date()
            //return_date: todaysDate().toString(),
        },
    });

    //update the available copies of the book
    const updatedBook = await prisma.book.update({
        where:{
            book_id: updatedTransaction.book_id,
        },
        data:{
            available_copies:{
                increment: 1
            },
        },
    });
    if(!updatedBook){
        res.status(400);
        throw new Error(" Failed to update boo Info")
    }

    res.status(200).json({
        message: "Book Successfully returned and Received",
        transaction: updateTransaction,
        updatedBook
    });

});

//delete a transaction
//DELETE /api/transactions/:id
//Private for admin


export {getAllTransactions, registerTransaction, transactionReturned}