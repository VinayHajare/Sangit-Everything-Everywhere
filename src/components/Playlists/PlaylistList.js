import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import api from "../../utils/api";

const PlaylistList = () => {
  const { user } = useAuth(); // Access the authenticated user
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await api.get(`/playlists/user/${user.username}`); // Fetch playlists for dynamic username
        setPlaylists(response.data);
      } catch (err) {
        setError("Failed to fetch playlists. Please try again.");
      }
    };

    if (user?.username) {
      fetchPlaylists();
    }
  }, [user]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
 bg-music-background text-white p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
      {error && <div className="bg-red-500 p-3 rounded mb-4">{error}</div>}
      <div className="space-y-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{playlist.name}</h3>
            <Link to={`/playlists/${playlist.id}`}>
              <button className="mt-4 bg-music-primary text-black py-2 px-4 rounded hover:bg-green-600">
                View Playlist
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistList;
