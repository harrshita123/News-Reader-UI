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
      <h2 style={{ textAlign: "center", marginTop: 20 }}>
        No news found...
      </h2>
    );
  }

  return (
    <div className="card-container">
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) return null;

        return (
          <div className="news-card" key={index}>
            
            <div className="news-img">
              <img src={curItem.urlToImage} alt={curItem.title} />
            </div>

            <div className="news-content">

              <p 
                className="news-title"
                onClick={() => window.open(curItem.url, "_blank")}
              >
                {curItem.title}
              </p>

              <p className="news-time">{timeAgo(curItem.publishedAt)}</p>

              <p className="news-desc">{curItem.description}</p>

              <p 
                className="news-more"
                onClick={() => window.open(curItem.url, "_blank")}
              >
                Read More
              </p>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
