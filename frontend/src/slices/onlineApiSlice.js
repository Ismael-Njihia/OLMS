import { ONLINE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const onlineApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        fetchOnline: builder.query({
            query: () => ONLINE_URL,

            providesTags: ["Online"]
        }),
        createOnline: builder.mutation({
            query: (body) => ({
                url: `${ONLINE_URL}/create`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Online"]
        })
    })
})

export const{ useFetchOnlineQuery, 
    useCreateOnlineMutation } = onlineApiSlice;
