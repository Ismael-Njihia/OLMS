import { BOOK_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchBooks: builder.query({
            query: () => BOOK_URL,
            providesTags: ["Books"],
        }),
        getBookById: builder.query({
            query: (id) => `${BOOK_URL}/${id}`,
            providesTags: ["Book"],
        }),
        addBook: builder.mutation({
            query: (body) => ({
                url: `${BOOK_URL}/register`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Books"],
        }),
    }),
});

export const { useFetchBooksQuery,
    useAddBookMutation,
    useGetBookByIdQuery } = bookApiSlice;
