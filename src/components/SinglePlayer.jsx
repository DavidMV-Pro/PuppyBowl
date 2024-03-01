import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SinglePlayer() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/2308-ACC-PT-WEB-PT/players/${playerId}`
        );
        const playerData = await response.json();
        setPlayer(playerData.data.player);
      } catch (error) {
        console.error("Error  fetching player:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [playerId]);

  if (loading) {
    return <p>Loading player...</p>;
  }

  if (!player) {
    return <p>Player not found</p>;
  }

  return (
    <div>
      <h2>{player.name}</h2>
      <p>ID of Player: {player.id}</p>
      <p>Breed of player: {player.breed}</p>
      <p>Status: {player.status}</p>
      <img src={player.imageUrl} alt={player.name} width={300} />
    </div>
  );
}

export default SinglePlayer;
