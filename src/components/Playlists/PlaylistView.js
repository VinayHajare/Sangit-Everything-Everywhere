import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import api from "../../utils/api";

const PlaylistView = () => {
  const { playlistId } = useParams(); // Get playlist from the URL
  const { playSong } = usePlayer();
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState("");
  const [songIdToAdd, setSongIdToAdd] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch the playlist details on load
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await api.get(`/playlists/${playlistId}`);
        setPlaylist(response.data);
        setError("");
      } catch (error) {
        setError("An error occurred while fetching the playlist");
      }
    };
    fetchPlaylist();
  }, [playlistId]);

  // Handle adding a song to the playlist
  const handleAddSong = async () => {
    try {
      const formData = new FormData();
      formData.append("songId", songIdToAdd);

      await api.post(`/playlists/${playlistId}/addSong`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSongIdToAdd("");
      setSuccessMessage("Song added to the playlist successfully!");
      setError("");
      // Refresh the playlist after adding the song
      const response = await api.get(`/playlists/${playlistId}`);
      setPlaylist(response.data);
    } catch (error) {
      setError("An error occurred while adding the song to the playlist");
      setSuccessMessage("");
    }
  };

  // Handle removing a song from the playlist
  const handleRemoveSong = async (songIdToRemove) => {
    try {
      const formData = new FormData();
      formData.append("songId", songIdToRemove);

      await api.delete(`/playlists/${playlistId}/removeSong`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccessMessage("Song removed from the playlist successfully!");
      setError("");
      // Refresh the playlist after removing the song
      const response = await api.get(`/playlists/${playlistId}`);
      setPlaylist(response.data);
    } catch (error) {
      setError("An error occurred while removing the song from the playlist");
      setSuccessMessage("");
    }
  };

  const handleShuffle = async () => {
    try {
      const response = await api.get(`/playlists/${playlistId}/shuffle`);
      setPlaylist(response.data);
      setSuccessMessage("Playlist shuffled successfully!");
      setError("");
    } catch (error) {
      setError("An error occurred while shuffling the playlist");
      setSuccessMessage("");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
 bg-music-background text-white p-6"
    >
      {error && <div className="bg-red-500 p-3 rounded mb-4">{error}</div>}
      {successMessage && (
        <div className="bg-green-500 p-3 rounded mb-4">{successMessage}</div>
      )}

      {playlist && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">{playlist.name}</h2>
            <button
              onClick={handleShuffle}
              className="bg-music-primary text-black py-2 px-4 rounded hover:bg-green-600"
            >
              Shuffle Playlist
            </button>
          </div>

          <h3 className="text-xl mb-4">Songs in this Playlist:</h3>
          <div className="space-y-4">
            {playlist.songs.map((song) => (
              <div
                key={song.id}
                className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold">{song.title}</h4>
                <p className="text-sm text-music-secondary">{song.artist}</p>
                <button
                  onClick={() => playSong(song)}
                  className="mt-2 bg-music-primary text-black py-1 px-4 rounded hover:bg-green-600"
                >
                  Play
                </button>
                <button
                  onClick={() => handleRemoveSong(song.id)}
                  className="mt-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Song Section */}
          <div className="mt-8">
            <h3 className="text-xl mb-4">Add a Song:</h3>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Enter Song ID"
                value={songIdToAdd}
                onChange={(e) => setSongIdToAdd(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded text-white"
              />
              <button
                onClick={handleAddSong}
                className="bg-music-primary py-2 px-4 rounded text-black hover:bg-green-600"
              >
                Add Song
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistView;
