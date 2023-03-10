import React from "react";
import { useGetSubredditByNameQuery } from "../../services/redditAPI";
import Card from "../../components/Card/Card";
import { v4 as uunidv4 } from "uuid";

export default function Home() {
  const { data, isSuccess, isLoading, isFetching } =
    useGetSubredditByNameQuery("all");

  if (data && isSuccess) {
    return (
      <div id="detail" className={isLoading ? "loading" : ''}>
        {data.data.children?.map(child => <Card key={uunidv4()} data={child.data} />)}
      </div>
    );
  }
}
