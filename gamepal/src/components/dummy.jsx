import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../App.css";

export default function CardsContainer() {
  const [gameData, setGameData] = useState([]);

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

  return (
    <div className="cards-container">
      {gameData.map((game) => (
        <Cards key={game.id} game={game} />
      ))}
    </div>
  );
}



function Cards({ game }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card ${isFlipped ? "flipped" : ""}`} onClick={handleCardClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          
        </div>
        <div className="flip-card-back">
          <h2>Name: {game.Name}</h2>
          <p>Rating: {game.Rating}</p>
          <p>Downloads: {game.Downloads}</p>
        </div>
      </div>
    </div>
  );
}