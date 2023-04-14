import { ITask } from "@/models/ITask";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

/* export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], number>({
      query: (limit: number = 5) => ({
        url: '/users',
        params: {
          _limit: limit
        }
      }),
      providesTags: res => ['User']
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    })
  }) 
}); */
