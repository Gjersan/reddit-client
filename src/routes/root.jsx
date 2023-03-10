import { Outlet, Link, redirect, useNavigate } from "react-router-dom";
import { useGetSubredditsQuery } from "../services/redditAPI";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Root() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);
  const { data, isError, isSuccess } = useGetSubredditsQuery();

  function handleChange(e) {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  function handleClick() {
    setToggleSearch(!toggleSearch);
  }

  function handleSubmit() {
    if (toggleSearch) {
      return navigate(`search/${searchTerm}`);
    } else {
      return navigate(`subreddit/${searchTerm}`);
    }
  }

  useEffect(() => {
    if (searchTerm.length > 2) {
      const timer = setTimeout(() => {
        handleSubmit();
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchTerm]);

  return (
    <>
      <div id="sidebar">
        <h1></h1>
        <div>
          <input
            onChange={(e) => handleChange(e)}
            onSubmit={() => handleSubmit()}
            id="q"
            value={searchTerm}
            aria-label="Search"
            placeholder={
              toggleSearch ? "Search for posts..." : "Search for sub..."
            }
            type="search"
            name="q"
          />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
          <button onClick={() => handleClick()} type="button">
            {toggleSearch ? "Posts" : "Subreddits"}
          </button>
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
