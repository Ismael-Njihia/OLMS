import { SETTING_URL } from "../constants";
import {apiSlice} from "./apiSlice";

export const settingsApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getSettings: builder.query({
            query: () => ({
                url: `${SETTING_URL}`,
                method: 'GET'
            })
        }),
        updateASetting: builder.mutation({
            query: (setting) => ({
                url: `${SETTING_URL}/${setting.id}`,
                method: 'PUT',
                body: setting
            }),
            invalidatesTags: ['Settings']
        }),

    })
})

export const {useGetSettingsQuery,
    useUpdateASettingMutation
} = settingsApiSlice;