import React from "react";

const timeAgo = (timeString) => {
  const now = new Date();
  const past = new Date(timeString);
  const diff = Math.floor((now - past) / 1000); 

  if (diff < 60) return "Just now";
  if (diff < 3600) return Math.floor(diff / 60) + " mins ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  return Math.floor(diff / 86400) + " days ago";
};

const Card = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        No news found...
      </h2>
    );
  }

  return (
    <div className="card-container">
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) return null;

        return (
          <div className="card" key={index}>
            <img src={curItem.urlToImage} alt={curItem.title} />

            <div className="Content">
              <a
                className="title"
                onClick={() => window.open(curItem.url, "_blank")}
                style={{
                  cursor: "pointer",
                  color: "#092138",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                {curItem.title}
              </a>

              {}
              <p className="time">{timeAgo(curItem.publishedAt)}</p>

              <p>{curItem.description}</p>

              <a id="more" onClick={() => window.open(curItem.url, "_blank")}>
                Read More
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
