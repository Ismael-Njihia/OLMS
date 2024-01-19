import { USERS_URL } from "../constants";
import {apiSlice} from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (credentials) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: credentials
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}/`,
                method: 'GET'
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'GET'
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: `${USERS_URL}/register`,
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ['Users']
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'GET'
            })
        }),
        getTransactionsOfUser: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/transactions/${id}`,
                method: 'GET'
            })
        
        }),
    })
})

export const {
    useGetUsersQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetUserByIdQuery,
    useGetTransactionsOfUserQuery
} = usersApiSlice;