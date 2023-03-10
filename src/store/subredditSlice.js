import { createSlice } from "@reduxjs/toolkit";

export const subredditSlice = createSlice({
    initialState: {
        subreddit: "all",
    },
    name: "subreddit",
    reducers: {
        setSubreddit: (state, action) => {
            state.subreddit = action.payload;
        }
    }
})

export const { setSubreddit } = subredditSlice.actions;

export default subredditSlice.reducer;