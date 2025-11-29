import React, {useEffect, useState}  from "react";
import { FaSearch, FaBookmark, FaUser } from "react-icons/fa";

import Card from "./Card";


export default function Home() {

  const [search, setSearch] = useState("india");
  const [category, setCategory] = useState("All");          
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);             


  const API_KEY = "45a6015012dc41d28e608fc57cd13eee";
  const getData = async (query = search, cat = category) => {
    setLoading(true);    
    try {
      let url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

      // ⚪ If category is not "All", append category to query to filter results better
      if (cat !== "All") {
        url = `https://newsapi.org/v2/everything?q=${query} ${cat}&apiKey=${API_KEY}`;
      }

      const response = await fetch(url);
      const jsonData = await response.json();

      setNewsData(jsonData.articles);
    } 
    catch (error) {
      console.error("API Error:", error);
      setNewsData([]);
    }
     finally {
      setLoading(false);                                
    }
  };

  useEffect(() => {
    getData();
  }, []);

   const handleInput = (e) => {
      console.log(e.target.value);
      setSearch(e.target.value)
    }

    const handleCategoryClick = (cat) => {
    setCategory(cat);           
    setSearch(cat === "All" ? "india" : cat); 
    getData(cat === "All" ? "india" : cat, cat); 
  };


  return (
    <>
      <div className="home">
        <header className="navbar">
        <div className="logo"> 
        <img src="src/assets/logo.png" alt="Logo" className="logo-img" /> 
        <h1 className="logo-heading">NextRead</h1>
        </div> 

        <div className="search-box">
            <FaSearch size={18} color="white"/>

             <input
              type="text"
              id="placeholder-text-color"
              placeholder="Search news..."
              value={search}
              onKeyDown={(e) => e.key === "Enter" && getData()}
              onChange={handleInput}
            />
        </div>


        <div className="icons">
          <FaBookmark size={24} id="bookmark"/>
          <FaUser size={24} id="user"/>
        </div>
    </header>
    </div>


      <div className="tabs">
        {/* ⚪ Map tabs and highlight active tab */}
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


      {!loading && newsData ? <Card data={newsData} /> : null}
    </>
  );
}