import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetSubredditByNameQuery } from "../../services/redditAPI";
import { useLoaderData } from "react-router-dom";
import Card from "../../components/Card/Card";
import { v4 } from "uuid";
import { setSubreddit } from "../../store/subredditSlice";

export default function Subreddit() {
  const dispatch = useDispatch();

  const { params } = useLoaderData();
  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetSubredditByNameQuery(params.subreddit, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    dispatch(setSubreddit(params.subreddit));
  }, [params]);

  // if (isLoading || isFetching || !isSuccess) {
  //   <div id="detail">
  //     <Card isLoading={isLoading} />
  //   </div>;
  // }
  if (!data) {
    return (
      <div id="detail">
        <Card
          isFetching={isFetching}
          isLoading={isLoading}
          isError={isError}
          key={v4()}
        />
      </div>
    );
  }

  if (data) {
    return (
      <div id="detail">
        {data.data.children.map((post) => (
          <Card
            data={post.data}
            isFetching={isFetching}
            isLoading={isLoading}
            isError={isError}
            key={v4()}
          />
        ))}
      </div>
    );
  }
}

export async function loader({ params }) {
  return { params };
}
