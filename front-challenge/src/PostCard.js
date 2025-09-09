// PostCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ data, isLoading, error }) => {
  // defend: ensure data is an array we can map
  const posts = Array.isArray(data) ? data : [];

  return (
    <div className="Card-container">
      {error && (
        <div className="errorMessage">
          <h2>{error}</h2>
        </div>
      )}

      {isLoading && <div className="loadingMessage">Loading job post...</div>}

      {!isLoading && !posts.length && !error && (
        <div>
          <h2 className="no-results">No job posts found</h2>
        </div>
      )}

      {posts.map((post) => {
        // small defensive defaults
        const id = post?.id ?? "";
        const logo = post?.logo ?? "";
        const submitTime = post?.submitTime ?? "";
        const jobType = post?.jobType ?? "";
        const jobBreif = post?.jobBreif ?? "";
        const firmName = post?.firmName ?? "";
        const firmCountry = post?.firmCountry ?? "";

        return (
          <Link
            to={`/post/${encodeURIComponent(id)}`}
            key={id || Math.random().toString(36).slice(2, 9)}
            aria-label={`Open post ${jobBreif} at ${firmName}`}
          >
            <div className="box">
              {logo ? (
                <img src={logo} alt={`${firmName} logo`} />
              ) : (
                <div className="logo-placeholder" aria-hidden="true" />
              )}

              <p>
                {submitTime} <span aria-hidden="true">·</span> {jobType}
              </p>
              <h3>{jobBreif}</h3>
              <p>{firmName}</p>
              <p className="country">{firmCountry}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostCard;
