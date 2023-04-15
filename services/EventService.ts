import IEvent from "@/models/IModel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const eventAPI = createApi({
  reducerPath: 'eventAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://date.nager.at/api/v3' }),
  tagTypes: ['Event'],
  endpoints: (build) => ({
    fetchAllEvents: build.query<IEvent[], number>({
      query: () => ({
        url: '/NextPublicHolidaysWorldwide',
      }),
      providesTags: res => ['Event']
    })
  }) 
});
