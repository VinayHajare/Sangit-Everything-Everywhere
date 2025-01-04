import React, { createContext, useState, useContext } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null); // Current playing Song

  const playSong = (song) => {
    setCurrentSong(song); // Set the current song
  };

  const clearSong = () => {
    setCurrentSong(null); // Clear the current song
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playSong,
        clearSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
