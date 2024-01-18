import prisma from "../../db/prisma.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateRandom from "../util/generateRandom.js";

const getAllBooks = async (req, res) => {
    const books = await prisma.book.findMany({
  
    });
    res.json(books);
};

//get many books by IDs
//POST /api/books/getMany
//private
const getManyBooks = asyncHandler(async (req, res) => {
    const { book_ids } = req.body;
    const books = await prisma.book.findMany({
        where: {
            book_id: {
                in: book_ids
            }
        }
    });
    res.json(books);
});

//creating a book
//POST /api/books/register
//private
const registerBook = asyncHandler(async (req, res) => {
    try {
        const { title, author, isbn, genre, published_date, total_copies, image_url, description} = req.body;
        const userId = req.user.user_id;
        const user_type = req.user.user_type;
        if (user_type === "user") {
            res.status(401).json({ error: "Unauthorized to add Books!" });
            return;
        }
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }
        if (!author) {
            res.status(400);
            throw new Error("Author is required");
        }
        if (!isbn) {
            res.status(400);
            throw new Error("ISBN is required");
        }
        if (!genre) {
            res.status(400);
            throw new Error("Genre is required");
        }
        if (!published_date) {
            res.status(400);
            throw new Error("Published date is required");
        }
        if (!total_copies) {
            res.status(400);
            throw new Error("Total copies is required");
        }
        if (!image_url) {
            res.status(400);
            throw new Error("Image URL is required");
        }
        if (!description) {
            res.status(400);
            throw new Error("Description is required");
        }
        //check if the isbn exists from the book table
        const bookExists = await prisma.book.findFirst({
            where: {
                isbn: isbn
            }
        });

        if (bookExists) {
            res.status(400).json({ error: "Book already exists" });
            return;
        }

        //check if the user_id exists from the user table
        const userExists = await prisma.user.findFirst({
            where: {
                user_id: userId
            }
        });

        if (!userExists) {
            res.status(400).json({ error: "User does not exist" });
            return;
        }

        //check if the genre exists from the genre table
        const genreExists = await prisma.genre.findFirst({
            where: {
                genre_id: genre
            }
        });

        if (!genreExists) {
            res.status(400).json({ error: "Genre does not exist" });
            return;
        }

        const book_id = "OLMS" + "/" + generateRandom();
        const book = await prisma.book.create({
            data: {
                book_id,
                title,
                author,
                isbn,
                published_date,
                available_copies: total_copies,
                total_copies,
                image_url,
                description_: description,
                user_id: userId,
                genre_id: genre,
            }
        });

        if (book) {
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
                user_id: book.user_id,
                genre_id: book.genre_id,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//getting a book by id
//GET /api/books/:id
//Public
const getBookById = asyncHandler(async (req, res) => {
 const {id} = req.params;
 const BookId = 'OLMS/' + id;

    const book = await prisma.book.findFirst({
        where: {
            book_id: BookId
        },
        include: {
            genre: true,
            user: true,
        }
    });
    if(!book){
        res.status(404).json({ error: "Book not found" });
        return;
    }
    res.json(book);
});



export {getAllBooks, registerBook, getBookById, getManyBooks}