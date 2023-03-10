import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetSubredditByNameQuery } from "../../services/redditAPI";
import { useLoaderData } from "react-router-dom";
import Card from "../../components/Card/Card";
import { v4 } from "uuid";
import { setSubreddit } from "../../store/subredditSlice";

export default function Subreddit() {
  const { params } = useLoaderData();
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading } = useGetSubredditByNameQuery(
    params.subreddit, { refetchOnMountOrArgChange: true}
  );

  useEffect(() => {
    dispatch(setSubreddit(params.subreddit))
  }, [params])

  if (isLoading) {
    <div id="detail">
      <h1>Loading...</h1>
    </div>;
  }

  if (data && isSuccess) {
    return (
      <div id="detail">
        {data.data.children.map((post) => (
          <Card data={post.data} key={v4()} />
        ))}
      </div>
    );
  }
}

export async function loader({ params }) {
  return { params };
}
