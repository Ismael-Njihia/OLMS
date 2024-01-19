import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateRandom from "../util/generateRandom.js";
import generateSecondSinceEpoch from "../util/generateSecSinceEpoch.js";
import todaysDate from "../util/todaysDate.js";
import sendTransactionEmail from "../util/emailTransCreated.js";
import sendReturnEmail from "../util/emailReturned.js";
const getAllTransactions = async (req, res) => {
    const transactions = await prisma.transaction.findMany({
        include: {
            user: true,
           // book: true,
        },
        orderBy: {
            borrow_date: "asc",
        }
    });
    
    res.json(transactions);
};

//creating a transaction
//POST /api/transactions/register
//private
//used by admin and staff
const registerTransaction = asyncHandler(async (req, res) => {
    const {borrower_id, book_id, cost, borrow_date, expected_return_date} = req.body;
    //change book_id to an array
    const book_ids = [book_id];
    const staff_id = req.user.user_id;
    const return_date = null;
    const status = "borrowed";
    const fine = 0.0;
   
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
            book_id: book_ids,
            borrow_date: borrow_date.toString(),
            expected_return_date: expected_return_date.toString(),
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
        //send email to the borrower
        const email = borrowerExists.email;
        console.log(email + " email To send to");
        const first_Name = borrowerExists.first_name;
        const last_Name = borrowerExists.last_name;
        const transation_id = transaction_id;
        //change the borrow date from epoch to date by multiplying by 1000
        const borrow_date_date = new Date(borrow_date * 1000);
        const expected_return_date_date = new Date(expected_return_date * 1000);
        const totalCost = cost;
        sendTransactionEmail(email, first_Name, last_Name, transation_id, borrow_date_date, expected_return_date_date, totalCost);

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
        }).message(transaction_id)
        
    }
    else{
        res.status(400);
        throw new Error("Invalid transaction data");
    }
});
//creating a transaction Many Books
//POST /api/transactions/registerMany
//private
//used by admin and staff

const registerTransactionMany = asyncHandler(async (req, res) => {
    const { borrower_id, book_ids, cost, borrow_date, expected_return_date } = req.body;
    console.log(borrower_id + " borrower_id")
    const staff_id = req.user.user_id;
    const return_date = null;
    const status = "borrowed";
    const fine = 0.0;
  
    // Check if there are enough copies for all books
    for (const book_id of book_ids) {
      const bookExists = await prisma.book.findUnique({
        where: {
          book_id: book_id
        }
      });
  
      if (!bookExists || bookExists.available_copies <= 0) {
        res.status(400);
        throw new Error(`There are no available copies of the book with ID: ${book_id}`);
      }
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
  
    // Generate a single transaction ID for all books
    const transactionIdINT = generateSecondSinceEpoch() + generateRandom();
    const transaction_id = transactionIdINT.toString();
  
    // Create a single transaction for all books
    const transaction = await prisma.transaction.create({
      data: {
        transation_id: transaction_id,
        borrower_id,
        book_id: book_ids, // Assuming book_ids is an array of book IDs
        borrow_date: borrow_date.toString(),
        expected_return_date: expected_return_date.toString(),
        return_date,
        cost,
        status,
        fine,
        staff_id,
      }
    });
  
    // Update the available copies for all books
    const updateBooksPromises = book_ids.map(async (book_id) => {
      const updatedBook = await prisma.book.update({
        where: {
          book_id: book_id
        },
        data: {
          available_copies: {
            decrement: 1
          }
        }
      });
  
      if (!updatedBook) {
        res.status(400);
        throw new Error(`Failed to update book with ID: ${book_id}`);
      }
    });
  
    // Wait for all book updates to complete
    await Promise.all(updateBooksPromises);
  
    if (transaction) {

     //send email to the borrower
     const email = borrowerExists.email;
     console.log(email + " email To send to");
     const first_Name = borrowerExists.first_name;
     const last_Name = borrowerExists.last_name;
     const transation_id = transaction_id;
     //change the borrow date from epoch to date by multiplying by 1000
     const borrow_date_date = new Date(borrow_date * 1000);
     const expected_return_date_date = new Date(expected_return_date * 1000);
     const totalCost = cost;
     sendTransactionEmail(email, first_Name, last_Name, transation_id, borrow_date_date, expected_return_date_date, totalCost);

      res.status(201).json({
        transaction_id,
        borrower_id,
        book_ids,
        borrow_date,
        expected_return_date,
        return_date,
        cost,
        status,
        fine,
        staff_id
      });
    } else {
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
        res.status(400).json({Transaction: "Does not exist"});
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
            //return_date: new Date()
            return_date: todaysDate().toString(),
        },
    });

    console.log("Books to be updated: " + updatedTransaction.book_id)
    const updateBooksPromises = updatedTransaction.book_id.map(async (book_id) => {
    //update the available copies of the book
    const updatedBook = await prisma.book.update({
        //get book ids from the transaction
        //they are in array form

        where:{
            book_id: book_id,
        },
        data:{
            available_copies:{
                increment: 1
            },
        },
    });
    if(!updatedBook){
        res.status(400);
        throw new Error(`Failed to update book Info with id: {book_id}`)
    }
});
//wait for all book updates to complete
await Promise.all(updateBooksPromises);

//get the borrower Info from the updated transaction
const borrower = await prisma.user.findUnique({
    where:{
        user_id: updatedTransaction.borrower_id,
    },
});
if(!borrower){
    res.status(400);
    throw new Error(`Failed to get borrower Info with id: {updatedTransaction.borrower_id}`)
}
//send email to the borrower
const email = borrower.email;
console.log(email + " email To send to");
const first_Name = borrower.first_name;
const last_Name = borrower.last_name;
const transation_id = updatedTransaction.transation_id;
let today= new Date();
//make return_date_date more readable
const return_date_date = today.toDateString();

sendReturnEmail(email, first_Name, last_Name, transation_id,return_date_date);

    res.status(200).json({
        message: "Book Successfully returned and Received",
        transaction: updateTransaction,
        
    });


});

//get a transaction
//GET /api/transactions/:id
//private
//used by admin and staff
const getTransaction = asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const transaction = await prisma.transaction.findUnique({
        where:{
            transation_id: id,
        },
        include:{
            user: true,
            //book: true,
        },
    });
    if(!transaction){
        res.status(400).json({Transaction: "Does not exist"});
    }
    res.status(200).json(transaction);
});

//delete a transaction
//DELETE /api/transactions/:id
//Private for admin




export {getAllTransactions,getTransaction, registerTransaction, transactionReturned, registerTransactionMany}