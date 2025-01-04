import React, { useState } from "react";
import api from "../../utils/api";

const SongSearch = () => {
  const [query, setQuery] = useState("");
  const [searchBy, setsearchBy] = useState("title"); // Default to search by title
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let params = "";
      if (searchBy === "title") params = `title=${query}`;
      if (searchBy === "artist") params = `artist=${query}`;
      if (searchBy === "album") params = `album=${query}`;
      if (searchBy === "genre") params = `genre=${query}`;

      const response = await api.get(`/songs/search?${params}`);
      setResults(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
 bg-music-background text-white p-6"
    >
      <h1 className="text-3xl font-bold text-music-primary mb-4">
        Search for Songs
      </h1>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Parameter Dropdown */}
          <select
            value={searchBy}
            onChange={(e) => setsearchBy(e.target.value)}
            className="w-full md:w-1/4 p-3 mb-4 bg-gray-800 rounded text-white"
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="genre">Genre</option>
          </select>

          {/* Query Input */}
          <input
            type="text"
            placeholder={`Search by ${searchBy}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-3/4 p-3 mb-4 bg-gray-800 rounded text-white"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto bg-music-primary py-2 px-4 rounded hover:bg-green-600"
          >
            Search
          </button>
        </div>
      </form>

      {error && <div className="bg-red-500 p-3 rounded mb-4">{error}</div>}

      {/* Results Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((song) => (
          <div
            key={song.id}
            className="bg-gray-800 rounded p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{song.title}</h2>
            <p className="text-sm text-music-secondary">
              Artist: {song.artist}
            </p>
            <p className="text-sm text-music-secondary">Album: {song.album}</p>
            <button className="mt-4 bg-music-primary text-black py-2 px-4 rounded hover:bg-green-600">
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongSearch;
