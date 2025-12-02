import React, { useEffect, useState } from "react";
import { FaSearch, FaBookmark, FaUser } from "react-icons/fa";
import Card from "../components/Card.jsx";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const timeAgo = (timeString) => {
  const now = new Date();
  const past = new Date(timeString);
  const diff = Math.floor((now - past) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return Math.floor(diff / 60) + " mins ago";
  if (diff < 86400) return Math.floor(diff / 3600) + " hours ago";
  return Math.floor(diff / 86400) + " days ago";
};

const Timeline = ({ data }) => {
  const now = new Date();
  const recent = data.filter((item) => {
    const diffHours = (now - new Date(item.publishedAt)) / 3600000;
    return diffHours <= 72;
  });

  if (recent.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: "20px" }}>No news in the last 72 hours.</h2>;
  }

  const groups = {
    "Last 1 hour": [],
    "Last 3 hours": [],
    "Last 6 hours": [],
    "Last 12 hours": [],
    "Last 24 hours": [],
    "Last 48 hours": [],
    "Last 72 hours": [],
  };

  recent.forEach((item) => {
    const diffHours = (now - new Date(item.publishedAt)) / 3600000;
    if (diffHours <= 1) groups["Last 1 hour"].push(item);
    else if (diffHours <= 3) groups["Last 3 hours"].push(item);
    else if (diffHours <= 6) groups["Last 6 hours"].push(item);
    else if (diffHours <= 12) groups["Last 12 hours"].push(item);
    else if (diffHours <= 24) groups["Last 24 hours"].push(item);
    else if (diffHours <= 48) groups["Last 48 hours"].push(item);
    else groups["Last 72 hours"].push(item);
  });

  const sectionOrder = [
    "Last 1 hour",
    "Last 3 hours",
    "Last 6 hours",
    "Last 12 hours",
    "Last 24 hours",
    "Last 48 hours",
    "Last 72 hours",
  ];

  return (
    <div className="timeline-container">
      {sectionOrder.map((section) =>
        groups[section].length > 0 ? (
          <div key={section} className="timeline-section">
            <h2 className="timeline-section-title">{section}</h2>
            {groups[section].map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3 className="timeline-title" onClick={() => window.open(item.url, "_blank")}>
                    {item.title}
                  </h3>
                  <p className="timeline-time">{timeAgo(item.publishedAt)}</p>
                  {item.urlToImage && <img src={item.urlToImage} alt="" className="timeline-img" />}
                </div>
              </div>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
};

const sortTrending = (articles) => {
  return articles
    .filter((a) => a.urlToImage)
    .map((a) => ({
      ...a,
      popularityScore:
        (a.title?.length || 0) +
        (a.description?.length || 0) +
        (a.content?.length || 0),
    }))
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const API_KEY = "6b2865b96d6941acb2123af2dcc10a72";

  const getData = async (query = search, cat = category) => {
    setLoading(true);
      setLoading(true);
  try {
    if (!query.trim()) query = "india";
      let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
      if (cat !== "All") url = `https://newsapi.org/v2/everything?q=${query} ${cat}&apiKey=${API_KEY}`;

      const response = await fetch(url);
      const jsonData = await response.json();
      let articles = jsonData.articles || [];

      if (cat === "All") articles = sortTrending(articles);
      else articles = articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      setNewsData(articles);
    } catch (error) {
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCategoryClick = (cat) => {
    setCategory(cat);

    setVisibleCount(4);
    getData(search, cat);

  };

  return (
    <>
      <header className="navbar">
  <div className="left-section">
    <img src="src/assets/logo.png" alt="Logo" className="logo-img" />
    <h1 className="logo-heading">NextRead</h1>
  </div>

  <div className="search-box">
    <FaSearch size={18} color="white" />
    <input
      type="text"
      placeholder="Search news..."
      value={search}
      onKeyDown={(e) => e.key === "Enter" && getData()}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <div className="icons">
    <FaBookmark size={24} id="bookmark" onClick={() => navigate("/saved")}/>
    <FaUser size={24} id="user" onClick={() => setOpen(!open)}/>
  </div>
{open && (
  <div className="drop">
    <button onClick={handleLogout} className="logout-btn">
      <FiLogOut size={18} color="red" style={{ marginRight: "8px" }} />
      Logout
    </button>
  </div>
)}

</header>

      <div className="tabs">
        {[
          "All",
          "Technology",
          "Sports",
          "Business",
          "Entertainment",
          "Health",
          "Science",
          "Startups",
          "Markets",
          "Timeline",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`tab ${category === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div className="loader"></div>
          <p>Loading news...</p>
        </div>
      )}

      {!loading && newsData && (
        category === "Timeline" ? (
          <Timeline data={newsData} />
        ) : (
          <>
            <Card data={newsData.slice(0, visibleCount)} />
            {visibleCount < newsData.length && (
              <div style={{ textAlign: "center", margin: "20px" }}>
                <button
                  className="load-more"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )
      )}
    </>
  );
}
