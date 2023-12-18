import { GENRE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchGenres: builder.query({
            query: () => GENRE_URL,
            providesTags: ["Genres"],
        }),
    }),
});

export const { useFetchGenresQuery } = genreApiSlice;