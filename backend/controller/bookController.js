import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateRandom from "../util/generateRandom.js";

const getAllBooks = async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
};

//creating a book
//POST /api/books/register
//private
const registerBook = asyncHandler(async (req, res) => {
    const {title, author,isbn, genre, published_date, available_copies, total_copies, image_url, description, user_id} = req.body;
    if(!title){
        res.status(400);
        throw new Error("Title is required");
    }
    if(!author){
        res.status(400);
        throw new Error("Author is required");
    }
    if(!isbn){
        res.status(400);
        throw new Error("ISBN is required");
    }   
    if(!genre){
        res.status(400);
        throw new Error("Genre is required");
    }
    if(!published_date){
        res.status(400);
        throw new Error("Published date is required");
    }
    if(!available_copies){
        res.status(400);
        throw new Error("Available copies is required");
    }
    if(!total_copies){
        res.status(400);
        throw new Error("Total copies is required");
    }
    if(!image_url){
        res.status(400);
        throw new Error("Image URL is required");
    }
    if(!description){
        res.status(400);
        throw new Error("Description is required");
    }
    if(!user_id){
        res.status(400);
        throw new Error("User ID is required");
    }
    //check if the isbn exists from the book table
    const bookExists = await prisma.book.findFirst({
        where: {
            isbn: isbn
        }})
     if(bookExists){
        res.status(400);
        throw new Error("Book already exists");
     }
    //check if the user_id exists from the user table
    const userExists = await prisma.user.findFirst({
        where: {
            user_id: user_id
        }
    });
    if(!userExists){
        res.status(400);
        throw new Error("User does not exist");
    }
    
    const book_id = "OLMS"+"/"+generateRandom();
    const book = await prisma.book.create({
        data: {
            book_id,
            title,
            author,
            isbn,
            genre,
            published_date,
            available_copies,
            total_copies,
            image_url,
            description_: description,
            user_id
        }
    });
    if(book){
        res.status(201).json({
            book_id: book.book_id,
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            genre: book.genre,
            published_date: book.published_date,
            available_copies: book.available_copies,
            total_copies: book.total_copies,
            image_url: book.image_url,
            description: book.description_,
            user_id: book.user_id
        })

    }


});



export {getAllBooks, registerBook}