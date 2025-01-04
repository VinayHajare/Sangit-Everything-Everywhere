import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { usePlayer } from "../../context/PlayerContext";

const PlaybackHistory = () => {
  const [history, sethistory] = useState([]);
  const [error, setError] = useState("");
  const { playSong } = usePlayer(); // Get playSong from PlayerContext

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/playback-history");
        sethistory(response.data);
        setError("");
      } catch (error) {
        setError("Failed to fetch playback history. Please try again.");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
 bg-music-background text-white p-6"
    >
      <h2 className="text-3xl font-bold text-music-primary mb-4">
        Playback History
      </h2>
      {error && <div className="bg-red-500 p-3 rounded mb-4">{error}</div>}

      {/* Playback History List*/}
      <div className="space-y-4">
        {history.map((entry) => (
          <div
            key={entry.songId}
            className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{entry.songTitle}</h3>
            <p className="text-sm text-music-secondary">{entry.artistName}</p>
            <p className="text-sm text-music-secondary">
              Played on: {new Date(entry.playbackDate).toLocaleString()}
            </p>
            <button
              onClick={() =>
                playSong({ id: entry.songId, title: entry.songTitle })
              }
              className="mt-2 bg-music-primary text-black py-1 px-4 rounded hover:bg-green-600"
            >
              Play Again
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaybackHistory;
