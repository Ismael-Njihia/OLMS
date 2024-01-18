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
                url: `${TRANSACTION_URL}/${id}`,
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
        manyTransaction: builder.mutation({
            query: (transactions) => ({
                url: `${TRANSACTION_URL}/registerMany`,
                method: 'POST',
                body: transactions
            }),
            invalidatesTags: ['Transactions']
        }),
        updateTransaction: builder.mutation({
            query: (id) => ({
                url: `${TRANSACTION_URL}/${id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Transactions']
        }),
        deleteTransaction: builder.mutation({
            query: (id) => ({
                url: `${TRANSACTION_URL}/${id}`,
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
    useManyTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,

} = transactionApiSlice;