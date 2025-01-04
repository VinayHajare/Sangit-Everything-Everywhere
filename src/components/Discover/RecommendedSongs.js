import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { usePlayer } from "../../context/PlayerContext";
import { useAuth } from "../../hooks/useAuth";

const RecommendedSongs = () => {
  const [genre, setGenre] = useState("Pop"); // Default genre
  const [recommendations, setRecommendations] = useState([]);
  const [userRecommendations, setUserRecommendations] = useState([]);
  const [historyRecommendations, setHistoryRecommendations] = useState([]);
  const [error, setError] = useState("");
  const { playSong } = usePlayer(); // get playsong from PlayerContext
  const { user } = useAuth();

  // Fetch recommendations based on genre
  useEffect(() => {
    const fetchGenreRecommendations = async () => {
      try {
        const response = await api.get(
          `/discover/recommend/genre?genre=${genre}`
        );
        setRecommendations(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch recommendations.");
      }
    };

    fetchGenreRecommendations();
  }, [genre]);

  // Fetch user-specific recommendations
  useEffect(() => {
    const fetchUserRecommendations = async () => {
      try {
        const response = await api.get(
          `/discover/recommend/user/${user.username}`
        );
        setUserRecommendations(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch user recommendations.");
      }
    };

    if (user?.username) {
      fetchUserRecommendations();
    }
  }, [user.username]);

  // Fetch recommendations based on listening history
  useEffect(() => {
    const fetchHistoryRecommendations = async () => {
      try {
        const response = await api.get("discover/recommendations");
        setHistoryRecommendations(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch history recommendations.");
      }
    };

    fetchHistoryRecommendations();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
 bg-music-background text-white p-6"
    >
      <h2 className="text-3xl font-bold text-music-primary mb-4">
        Discover Music
      </h2>
      {error && <div className="bg-red-500 p-3 rounded mb-4">{error}</div>}

      {/* Genre Recommendations */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Recommended Songs by Genre</h3>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-3 bg-gray-800 rounded text-white mb-4"
        >
          <option value="Pop">Pop</option>
          <option value="Rock">Rock</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
        </select>
        <div className="space-y-4">
          {recommendations.map((song) => (
            <div
              key={song.id}
              className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{song.title}</h3>
              <p className="text-sm text-music-secondary">{song.artist}</p>
              <button
                onClick={() => playSong({ id: song.id, title: song.title })}
                className="mt-2 bg-music-primary text-black py-1 px-4 rounded hover:bg-green-600"
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* User Recommendations */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Recommended Songs for You</h3>
        <div className="space-y-4">
          {userRecommendations.map((song) => (
            <div
              key={song.id}
              className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{song.title}</h3>
              <p className="text-sm text-music-secondary">{song.artist}</p>
              <button
                onClick={() => playSong({ id: song.id, title: song.title })}
                className="mt-2 bg-music-primary text-black py-1 px-4 rounded hover:bg-green-600"
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation based on listening History */}
      <div>
        <h3 className="text-2xl font-bold mb-4">
          Recommended Songs based on Playback History
        </h3>
        <div className="space-y-4">
          {historyRecommendations.map((song) => (
            <div
              key={song.id}
              className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{song.title}</h3>
              <p className="text-sm text-music-secondary">{song.artist}</p>
              <button
                onClick={() => playSong({ id: song.id, title: song.title })}
                className="mt-2 bg-music-primary text-black py-1 px-4 rounded hover:bg-green-600"
              >
                Play
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedSongs;
