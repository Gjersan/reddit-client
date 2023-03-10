import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com" }),
  endpoints: (builder) => ({
    getSubreddits: builder.query({
      query: () => "/subreddits.json",
      transformResponse: (response) => response,
    }),
    getSubredditByName: builder.query({
      query: (name) => `/r/${name}.json`,
      transformResponse: (response) => response,
    }),
    getSearchResultForPosts: builder.query({
      query: (searchTerm) => `/search.json?q=${searchTerm}`,
    }),
  }),
});

export const {
  useGetSubredditsQuery,
  useGetSubredditByNameQuery,
  useGetSearchResultForPostsQuery,
} = redditApi;
