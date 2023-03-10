import { Outlet, Link, redirect, useNavigate } from "react-router-dom";
import { useGetSubredditsQuery } from "../services/redditAPI";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Root() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isError, isSuccess } = useGetSubredditsQuery();
  const subreddit = useSelector((state) => state.subreddit.subreddit);

  function handleChange(e) {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  function handleSubmit() {
    if (searchTerm.length > 0) {
      return navigate(`search/${searchTerm}`);
    } else {
      return navigate(`subreddit/${subreddit}`)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("redirect " + searchTerm);
      handleSubmit();
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <>
      <div id="sidebar">
        <h1>Neat Reddit - {subreddit}</h1>
        <div>
          <form id="search-form" role="search">
            <input
              onChange={(e) => handleChange(e)}
              id="q"
              value={searchTerm}
              aria-label="Search"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="get">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            {isSuccess ? (
              data.data.children.map((sub) => (
                <li key={uuidv4()}>
                  <Link to={`subreddit/${sub.data.display_name}`}>
                    {sub.data.display_name_prefixed}
                  </Link>
                </li>
              ))
            ) : isError ? (
              <li>Error fetching!</li>
            ) : (
              <li>Fetching...</li>
            )}
          </ul>
        </nav>
      </div>

      <Outlet />
    </>
  );
}

export async function loader({ params }) {
  return { params };
}
