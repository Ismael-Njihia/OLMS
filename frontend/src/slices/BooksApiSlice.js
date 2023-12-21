import { BOOK_URL, UPLOAD_URL } from "../constants";
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
        uploadImage: builder.mutation({
            query: (body) => ({
                url: `${UPLOAD_URL}`,
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useFetchBooksQuery,
    useAddBookMutation,
    useUploadImageMutation,
    useGetBookByIdQuery } = bookApiSlice;
