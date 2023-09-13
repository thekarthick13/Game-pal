
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../index.css";
import Details from "./Details";
import ps from "../assets/ps.png"
import xbox from "../assets/xbox.png"
import pc from "../assets/windows.png"
import goty from "../assets/goty.png"
import arrow from "../assets/arrow.png"

export default function CardsContainer() {
  const [gameData, setGameData] = useState([]);
  const [showHiddenDiv, setShowHiddenDiv] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameDataCollection = collection(db, "GameData");
        const querySnapshot = await getDocs(gameDataCollection);

        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({ id: doc.id, ...doc.data() });
        });

        setGameData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleHiddenDiv = (gameId) => {
    setSelectedGameId(gameId);
    setShowHiddenDiv(!showHiddenDiv);
  };
  
  

  return (
    <div className="cards-container">
      {gameData.map((game) => (
        <Cards
          key={game.id}
          game={game}
          toggleHiddenDiv={() => toggleHiddenDiv(game.id)}
          isSelected={selectedGameId === game.id}
        />
      ))}
      
    
      <div className={`hidden-div ${showHiddenDiv ? "active" : ""}`}>
        <div className="details-header">
        
        <button className="exit-btn" onClick={() => toggleHiddenDiv(null)}>
          <img width="30px"src={arrow}/>
        </button>
        </div>
        <div className="details-hero">
        <div className="details-left">
        <img className="details-poster" src={selectedGameId ? gameData.find((game) => game.id === selectedGameId).Poster: ""}/>
        
        </div>

        <div className="details-div">
        <h1 className="details-name">{selectedGameId ? gameData.find((game) => game.id === selectedGameId).Name : ""}</h1>
        <p className="details-quote"><i>"{selectedGameId ? gameData.find((game) => game.id === selectedGameId).Quote : ""}"</i></p>
        <p className="genre" >Genre: &nbsp;&nbsp;&nbsp;{selectedGameId ? gameData.find((game) => game.id === selectedGameId).Genre : ""}</p>
        <p className="dev">Developer:&nbsp;&nbsp;&nbsp; {selectedGameId ? gameData.find((game) => game.id === selectedGameId).Developer : ""}</p>
        <p className="release">Release Date: &nbsp;&nbsp;&nbsp;{selectedGameId ? gameData.find((game) => game.id === selectedGameId).Release: ""}</p>
        <p className="rating">Rating: &nbsp;&nbsp;&nbsp;{selectedGameId ? gameData.find((game) => game.id === selectedGameId).Rating : ""}</p>
        <div className="details-platform">
        Platforms:
        {selectedGameId && gameData.find((game) => game.id === selectedGameId).Playstation && (
          <img width="20px" height="20px"src={ps} alt="Playstation"/>
          )}
          {selectedGameId && gameData.find((game) => game.id === selectedGameId).Xbox && (
          <img width="19px" height="18px"src= {xbox} alt="PC"/>
          )}
          {selectedGameId && gameData.find((game) => game.id === selectedGameId).PC && (
          <img width="21px" height="17px"src= {pc} alt="PC"/>
          )}
        </div>
        <p className="duration">Duration: &nbsp;&nbsp;&nbsp;{selectedGameId ? gameData.find((game) => game.id === selectedGameId).Duration : ""} Hours</p>
        <p className="trophies">Trophies:&nbsp;&nbsp;&nbsp; {selectedGameId ? gameData.find((game) => game.id === selectedGameId).Trophies : ""}</p>
        <p className="walkthru">Walkthrough: &nbsp;&nbsp;&nbsp;<a href={selectedGameId ? gameData.find((game) => game.id === selectedGameId).Walkthrough : ""} target="blank"><i>IGN Guide</i></a></p>
        
        </div>
        <div className="trailer">
          <h3>Trailer:</h3>
        <iframe className="details-trailer" width="320" height="180" src={selectedGameId ? gameData.find((game) => game.id === selectedGameId).Trailer: ""}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        {selectedGameId && gameData.find((game) => game.id === selectedGameId).GOTY && (
          <img className="goty"width="60px" height="40px"src={goty} alt="Game of the Year"/>
          )}
        </div>
       
        </div>


      </div>
    </div>
    
  );
  
}

function Cards({ game, toggleHiddenDiv, isSelected }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!isSelected) {
      // If the hidden div collapses or another card is selected, flip the card back to its original state
      setIsFlipped(false);
    }
  }, [isSelected]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    toggleHiddenDiv(game.id); // Toggle the visibility of the hidden div for the clicked card's game
  };

  return (
    <div className={`flip-card ${isFlipped ? "flipped" : ""}`} onClick={handleCardClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img className="poster" src={game.Poster} alt={game.Name} />
        </div>
        <div className="flip-card-back">
          <div className="title">
            <h3>{game.Name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
