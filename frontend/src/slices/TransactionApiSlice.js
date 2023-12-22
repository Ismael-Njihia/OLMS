import { TRANSACTION_URL } from "../constants";
import {apiSlice} from "./apiSlice";

export const transactionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getTransactions: builder.query({
            query: () => ({
                url: `${TRANSACTION_URL}`,
                method: 'GET'
            })
        }),
        getTransaction: builder.query({
            query: (id) => ({
                url: `${TRANSACTION_URL}/transactions/${id}`,
                method: 'GET'
            })
        }),
        createTransaction: builder.mutation({
            query: (transaction) => ({
                url: `${TRANSACTION_URL}/register`,
                method: 'POST',
                body: transaction
            }),
            invalidatesTags: ['Transactions']
        }),
        updateTransaction: builder.mutation({
            query: (transaction) => ({
                url: `${TRANSACTION_URL}/transactions/${transaction.id}`,
                method: 'PUT',
                body: transaction
            }),
            invalidatesTags: ['Transactions']
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `${TRANSACTION_URL}/transactions/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Transactions']
        }),
    })
});

export const {
    useGetTransactionsQuery,
    useGetTransactionQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,

} = transactionApiSlice;