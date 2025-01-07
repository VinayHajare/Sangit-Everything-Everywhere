import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../utils/api";

const PlaylistCreate = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("playlistName", playlistName);
      formData.append("username", user.username);
  
      await api.post("/playlists/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setSuccess(true);
      setError("");
      setPlaylistName("");
    } catch (err) {
      setError("Failed to create playlist. Please try again.");
      setSuccess(false);
    }
  };
  

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
 bg-music-background text-white p-6"
    >
      <h2 className="text-2xl font-bold mb-4">Create a Playlist</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Playlist Name"
          className="w-full p-3 bg-gray-800 rounded text-white"
          required
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-music-primary rounded text-black hover:bg-green-600"
        >
          Create Playlist
        </button>
      </form>

      {error && <div className="bg-red-500 p-3 rounded mt-4">{error}</div>}
      {success && (
        <div className="bg-green-500 p-3 rounded mt-4">
          Playlist created successfully!
        </div>
      )}
    </div>
  );
};

export default PlaylistCreate;
