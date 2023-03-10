import React from "react";
import { useLoaderData } from "react-router-dom";
import { useGetSearchResultForPostsQuery } from "../../services/redditAPI";
import Card from "../../components/Card/Card";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const { params } = useLoaderData();
  const { data, isSuccess, isLoading, isFetching} = useGetSearchResultForPostsQuery(params.searchTerm)
  
  if(data && isSuccess) {

    return <div id="detail">{data.data.children.map(item => <Card key={v4()} data={item.data} isSuccess={isSuccess} isLoading={isLoading} isFetching={isFetching} />)}</div>;
  }
}

export function loader({ params }) {
  return { params };
}
