import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useGetSearchResultForPostsQuery } from "../../services/redditAPI";
import Card from "../../components/Card/Card";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const { params } = useLoaderData();
  const { data, isSuccess, isLoading, isFetching, isError } =
    useGetSearchResultForPostsQuery(params.searchTerm, {
      refetchOnMountOrArgChange: true,
    });

    if(!data) {
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
        {data.data.children.map((item) => (
          <Card
            key={v4()}
            data={item.data}
            isSuccess={isSuccess}
            isFetching={isFetching}
            isLoading={isLoading}
          />
        ))}
      </div>
    );
  }
}

export function loader({ params }) {
  return { params };
}
