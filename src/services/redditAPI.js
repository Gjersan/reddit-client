import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const redditApi = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com" }),
  endpoints: (builder) => ({
    getSubreddits: builder.query({
      query: () => "/subreddits.json",
    }),
    getSubredditByName: builder.query({
      query: (name) => `/r/${name}.json`,
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
