import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { usePlayer } from "../../context/PlayerContext";

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");
  const { playSong } = usePlayer();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await api.get("/songs");
        setSongs(response.data);
      } catch (error) {
        setError("Failed to fetch songs. Please try again.");
      }
    };
    fetchSongs();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
 bg-music-background text-white p-6"
    >
      <h1 className="text-3xl font-bold text-music-primary mb-4">
        Available Songs
      </h1>
      {error && <div className="bg-red-500 p-3 rounded mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song) => (
          <div
            key={song.id}
            className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{song.title}</h2>
            <p className="text-sm text-music-secondary">
              Artist: {song.artist}
            </p>
            <p className="text-sm text-music-secondary">Album: {song.album}</p>
            <button
              onClick={() => playSong(song)}
              className="mt-4 bg-music-primary text-black py-2 px-2 rounded hover:bg-green-500"
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
