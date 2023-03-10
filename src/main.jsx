import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root, { loader as rootLoader } from "./routes/root";
import ErrorPage from "./error-page";
import Search, { loader as searchLoader } from "./routes/search/Search";
import Subreddit, {
  loader as subredditLoader,
} from "./routes/subreddit/Subreddit";
import Home from "./routes/home/Home";
import Post from "./routes/post/Post";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { redditApi } from "../src/services/redditAPI";
import subredditSlice from "./store/subredditSlice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "search/:searchTerm",
        element: <Search />,
        loader: searchLoader,
      },
      {
        path: "subreddit/:subreddit",
        element: <Subreddit />,
        loader: subredditLoader,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "post/:permalink",
        element: <Post />,
      },
    ],
  },
]);

const store = configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer,
    subreddit: subredditSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(redditApi.middleware),
});

setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
