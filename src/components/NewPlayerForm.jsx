import React, { useState } from "react";
import "../NewPlayerForm.css"; // Import CSS file for styling

function NewPlayerForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("bench"); // Default status is "Bench"
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-puppy-bowl.herokuapp.com/api/2308-ACC-PT-WEB-PT/players",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            breed,
            status,
            imageUrl,
            createdByForm: true,
          }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error("Failed to add player");
      }
      setMessage("Player added successfully");
      // Reset form fields after successful submission
      setName("");
      setBreed("");
      setStatus("bench"); // Reset status to default "Bench"
      setImageUrl("");
    } catch (error) {
      console.error("Error adding player:", error);
      setMessage("Failed to add player");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Player</h2>
      {message && (
        <p
          className={
            message === "Player added successfully" ? "success" : "error"
          }
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="player-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Breed:</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Bench">Bench</option>
            <option value="Field">Field</option>
          </select>
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Add Player</button>
      </form>
    </div>
  );
}

export default NewPlayerForm;
