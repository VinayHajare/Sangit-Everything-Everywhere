import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaMusic, FaSearch, FaList, FaPlus, FaCompass, FaHistory, FaUserFriends, FaUser } from "react-icons/fa";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-music-background text-white p-6">
      <header className="p-4 bg-gray-900 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-center text-music-primary">
          Sangit🎶 - Everything, Everywhere
        </h1>
        <span>Welcome, {user?.username || "User"}!</span>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Link
          to="/songs"
          className="bg-gray-800 p-6 rounded shadow hover:shadow-lg hover:bg-gray-700 transition flex items-center gap-4"
        >
          <FaMusic className="text-music-primary text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Browse Songs</h2>
            <p className="text-sm text-music-secondary">
              Explore your favorite tracks.
            </p>
          </div>
        </Link>
        <Link
          to="/songs/search"
          className="bg-gray-800 p-6 rounded shadow hover:shadow-lg hover:bg-gray-700 transition flex items-center gap-4"
        >
          <FaSearch className="text-music-primary text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Search Songs</h2>
            <p className="text-sm text-music-secondary">
              Find songs by title, artist, album, or genre.
            </p>
          </div>
        </Link>
        <Link
          to="/playlists"
          className="bg-gray-800 p-6 rounded shadow hover:shadow-lg hover:bg-gray-700 transition flex items-center gap-4"
        >
          <FaList className="text-music-primary text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Manage Playlists</h2>
            <p className="text-sm text-music-secondary">
              Create and manage your playlists.
            </p>
          </div>
        </Link>
        <Link
          to="/playlists/create"
          className="bg-gray-800 p-6 rounded shadow hover:shadow-lg hover:bg-gray-700 transition flex items-center gap-4"
        >
          <FaPlus className="text-music-primary text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Create Playlist</h2>
            <p className="text-sm text-music-secondary">
              Start a new playlist with your favorite tracks.
            </p>
          </div>
        </Link>
        <Link
          to="/discover"
          className="bg-gray-800 p-6 rounded shadow hover:shadow-lg hover:bg-gray-700 transition flex items-center gap-4"
        >
          <FaCompass className="text-music-primary text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Discover Music</h2>
            <p className="text-sm text-music-secondary">
              Find recommendations and more.
            </p>
          </div>
        </Link>
        <Link
          to="/history"
          className="bg-gray-800 p-6 rounded shadow hover:shadow-lg hover:bg-gray-700 transition flex items-center gap-4"
        >
          <FaHistory className="text-music-primary text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Playback History</h2>
            <p className="text-sm text-music-secondary">
              View your recently played songs.
            </p>
          </div>
        </Link>
        <Link
          to="/follow"
          className="bg-gray-800 p-6 rounded shadow hover:shadow-lg hover:bg-gray-700 transition flex items-center gap-4"
        >
          <FaUserFriends className="text-music-primary text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Follow Artists</h2>
            <p className="text-sm text-music-secondary">
              Discover and follow your favorite artists.
            </p>
          </div>
        </Link>
        <Link
          to="/profile"
          className="bg-gray-800 p-6 rounded shadow hover:shadow-lg hover:bg-gray-700 transition flex items-center gap-4"
        >
          <FaUser className="text-music-primary text-3xl" />
          <div>
            <h2 className="text-xl font-semibold">Your Profile</h2>
            <p className="text-sm text-music-secondary">
              View and edit your profile information.
            </p>
          </div>
        </Link>
      </main>
    </div>
  );
};

export default DashboardPage;
