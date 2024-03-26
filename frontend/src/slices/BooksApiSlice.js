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
        getManyBooks: builder.mutation({
            query: (ids) => ({
                url: `${BOOK_URL}/getMany`,
                method: "POST",
                body: ids,
            }),
            providesTags: ["Books"],
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
        editABook: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `${BOOK_URL}/${id}`,
                method: "PUT",
                body
            })
        })
        
    }),
});

export const { useFetchBooksQuery,
    useAddBookMutation,
    useUploadImageMutation,
    useGetManyBooksMutation,
    useEditABookMutation,
    useGetBookByIdQuery } = bookApiSlice;
