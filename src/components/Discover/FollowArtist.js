import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../utils/api";

const FollowArtist = () => {
  const [artists, setArtists] = React.useState([]); // List of artists
  const [error, setError] = React.useState(""); // Error message
  const { user } = useAuth(); // Get user details

  // Fetch artists on component load
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get("/artists");
        setArtists(response.data);
        setError("");
      } catch (error) {
        setError("Failed to fetch artists. Please try again later.");
      }
    };
    fetchArtists();
  }, []);

  // Handle follow/unfollow artist
  const toggleFollow = async (artistId, isFollowing) => {
    try {
      if (isFollowing) {
        await api.delete(`/discover/unFollowArtist`, {
          username: user.username,
          artistId: artistId,
        });
      } else {
        await api.post(`/discover/followArtist`, {
          username: user.username,
          artistId: artistId,
        });
      }

      // Update the local state
      setArtists((prevArtists) =>
        prevArtists.map((artist) =>
          artist.id === artistId
            ? { ...artist, isFollowing: !isFollowing }
            : artist
        )
      );
    } catch (error) {
      setError("Failed to follow artist. Please try again later.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
 bg-music-background text-white p-6"
    >
      <h2 className="text-3xl font-bold text-music-primary mb-4">
        Discover and Follow Artists
      </h2>
      {error && <div className="bg-red-500 p-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{artist.name}</h3>
            <p className="text-sm text-music-secondary">{artist.genre}</p>
            <button
              onClick={() => toggleFollow(artist.id, artist.isFollowing)}
              className={`mt-4 py-2 px-4 rounded ${
                artist.isFollowing
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-music-primary hover:bg-green-600"
              }`}
            >
              {artist.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowArtist;
