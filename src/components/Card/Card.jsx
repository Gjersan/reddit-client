import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { isUrl } from "../../helper/matchRegex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default function Card({ data }) {
  const timeStamp = dayjs.unix(data.created).utc();
  if (data) {
    return (
      <div id="card">
        <div className="card_sidebar">
          <FontAwesomeIcon icon={faArrowUp} />
          <p>{data.score}</p>
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
        <div className="card_main">
          <div className="card_header">
            <div>
              <Link to={`/subreddit/${data.subreddit}`}>
                <strong>{data.subreddit_name_prefixed}</strong>
              </Link>
              <span>
                {" * "}
                Posted by <strong>{data.author}</strong> *{" "}
                {timeStamp.local().fromNow()}
              </span>
            </div>
          </div>
          <Link to={`/comment${data.permalink}`}>
            <div className="card_img-container">
              {isUrl(data.url_overridden_by_dest) ? (
                <img src={data.url_overridden_by_dest} />
              ) : isUrl(data.thumbnail) ? (
                <img src={data.thumbnail} />
              ) : (
                ""
              )}
            </div>
            <h2>{data.title}</h2>
            <p>{data.selftext}</p>
            <div className="card_footer">
              <FontAwesomeIcon icon={faComment} /> {data.num_comments} Comments
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
