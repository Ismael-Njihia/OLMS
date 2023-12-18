import { BOOK_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchBooks: builder.query({
            query: () => BOOK_URL,
            providesTags: ["Books"],
        }),
    }),
});

export const { useFetchBooksQuery } = bookApiSlice;
