// MainContainer.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllPlayers from './AllPlayers';
import NewPlayerForm from './NewPlayerForm';
import SinglePlayer from './SinglePlayer';

//import Home from './Home'; // Assuming you have a Home component
//import NotFound from './NotFound'; // Assuming you have a NotFound component

function MainContainer() {

  


  return (
    <Routes>
      <Route path="/all-players" element={<AllPlayers />} />
      <Route path="/new-player-form" element={<NewPlayerForm />} />
      <Route path="/players/:playerId" element={<SinglePlayer />} />
    </Routes>
  );
}

export default MainContainer;
