import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "https://fsa-puppy-bowl.herokuapp.com/api/2308-ACC-PT-WEB-PT/players"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }
        //const playerData = await response.json();
        //const { data: { players } } = await response.json();
        const allPlayers = await response.json();
        setPlayers(allPlayers.data.players);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayerDelete = async (playerId) => {
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2308-ACC-PT-WEB-PT/players/${playerId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete player");
      }
      // Remove the deleted player from the list
      setPlayers(players.filter((player) => player.id !== playerId));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  if (loading) {
    return <p>Loading players...</p>;
  }

  return (
    <div>
      <input
        style={{
          backgroundColor: "white",
          color: "black",
          width: "50%",
        }}
        type="text"
        placeholder="Search players..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <h2>Click on a player below for more details</h2>
      <ul>
        {filteredPlayers.map((player) => (
          <li key={player.id} id="navbar">
            <Link to={`/players/${player.id}`} className="link">
              {player.name}{' '}
              <img src={player.imageUrl} alt={player.name} width={50} />
              {/* {player.createdByForm ? ( // Render delete button only for players created by form
                <button onClick={() => handlePlayerDelete(player.id)}>
                  Delete
                </button>
              ) : (
                <button>Other Button</button>
              )} 

              // Didn't go with this route since api doesn't accept different properties
              */}
              
            </Link>
            {/* <button onClick={() => handlePlayerDelete(player.id)}>
              Delete
            </button> */}
            {player.id > 430 && ( // Render delete button only for players whose id is greater than 430
              <button id="delete" onClick={() => handlePlayerDelete(player.id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllPlayers;
