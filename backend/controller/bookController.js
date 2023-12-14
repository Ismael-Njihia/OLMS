import prisma from "../../db/prisma.js";
const getAllBooks = async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
};

export {getAllBooks};