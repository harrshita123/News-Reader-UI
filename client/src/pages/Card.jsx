import React from "react";

const Card = ({ data }) => {
  if (!data || data.length === 0) {
    return <h2 style={{ textAlign: "center", marginTop: "20px" }}>No news found...</h2>;
  }

  return (
    <div className="card-container">
      {data.map((curItem, index) => {
        
        if (!curItem.urlToImage) {
          return null;
        } else {
          return (
            <div className="card" key={index}>
              <img src={curItem.urlToImage} alt={curItem.title} />

              <div className="Content">
 
                <a
                  className="title"
                  onClick={() => window.open(curItem.url, "_blank")}  
                  style={{ cursor: "pointer", color: "#092138", fontWeight: "bold", textDecoration: "none" }}
                >
                  {curItem.title}
                </a>
                <p>{curItem.description}</p>
                <button onClick={() => window.open(curItem.url, "_blank")}>Read More</button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
