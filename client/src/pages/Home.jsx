import React from "react";
import { FaSearch, FaBookmark, FaUser } from "react-icons/fa";
export default function Home() {
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
            <input type="text" id="placeholder-text-color"placeholder="Search news..." />
        </div>

        <div className="icons">
          <FaBookmark size={24} id="bookmark"/>
          <FaUser size={24} id="user"/>
        </div>
    </header>
    </div>

    <div class="tabs">
        <button className="tab active">All</button>
        <button className="tab">Technology</button>
        <button className="tab">Sports</button>
        <button className="tab">Business</button>
        <button className="tab">Entertainment</button>
        <button className="tab">Health</button>
        <button className="tab">Science</button>
        <button className="tab">Startups</button>
        <button className="tab">Markets</button>
        <button className="tab">Timeline</button>
    </div>


    <div className="card-container">
      <div className="card">
          <img src="" alt="AI Image" />
          <h3>AI Revolution: How Machine Learning is Transforming Indian Startups</h3>
          <p>Indian tech companies are rapidly adopting AI and machine learning to...</p>
        </div>

            <div className="card">
            <img src="" alt="Cricket" />
            <h3>India Wins Cricket Series Against Australia in Thrilling Final Match</h3>
            <p>Team India secured a historic victory in the final match with outstanding...</p>
        </div>

        <div className="card">
            <img src="" alt="Stock Market" />
            <h3>Stock Market Reaches All-Time High Amid Economic Recovery</h3>
            <p>Major indices hit record levels as investor confidence grows with positive...</p>
        </div>

    <div className="card">
            <img src="" alt="Stock Market" />
            <h3>Stock Market Reaches All-Time High Amid Economic Recovery</h3>
            <p>Major indices hit record levels as investor confidence grows with positive...</p>
        </div>
    </div>
    </>
  );
}