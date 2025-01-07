import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import api from "../../utils/api";

const SongPlayer = () => {
  const { currentSong, clearSong } = usePlayer();
  const audioRef = useRef(null); // Use ref for audio object
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  }, []);

  const handleSongEnd = useCallback(() => {
    clearSong();
    setIsPlaying(false);
    setProgress(0);
  }, [clearSong]);

  const fetchSongStream = useCallback(async () => {
    if (!currentSong) return;

    setIsLoading(true); // Set loading state
    setError("");

    try {
      const response = await api.get(`/stream/play/${currentSong.id}`, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }

      const newAudio = new Audio(url);
      newAudio.addEventListener("timeupdate", handleTimeUpdate);
      newAudio.addEventListener("ended", handleSongEnd);

      audioRef.current = newAudio; // Assign to ref
      setIsLoading(false); // Stop loading
    } catch {
      setError("Failed to stream the song. Please try again.");
      clearSong();
      setIsLoading(false); // Stop loading
    }
  }, [currentSong, handleTimeUpdate, handleSongEnd, clearSong]);

  useEffect(() => {
    if (currentSong) {
      fetchSongStream();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [currentSong, fetchSongStream, handleTimeUpdate, handleSongEnd]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setError("");
        })
        .catch((err) => {
          console.error("Playback failed:", err);
          setError(
            "Playback blocked by the browser. Please interact with the page to allow playback."
          );
        });
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!currentSong) {
    return (
      <div className="bg-music-background text-white p-4 text-center">
        No song selected
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto bg-music-background text-white p-4 rounded shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-2 text-center">{currentSong.title}</h2>
      {error ? (
        <div className="bg-red-500 p-3 rounded">{error}</div>
      ) : (
        <>
          <div className="flex justify-center items-center gap-4 mb-4">
            <button
              onClick={handlePlay}
              disabled={isPlaying || isLoading} // Disable during loading or playback
              className={`py-2 px-4 rounded ${
                isPlaying || isLoading
                  ? "bg-gray-600"
                  : "bg-music-primary hover:bg-green-600"
              }`}
            >
              {isLoading ? "Loading..." : "Play"}
            </button>
            <button
              onClick={handlePause}
              disabled={!isPlaying || isLoading}
              className={`py-2 px-4 rounded ${
                isPlaying && !isLoading
                  ? "bg-music-primary hover:bg-green-600"
                  : "bg-gray-600"
              }`}
            >
              Pause
            </button>
            <button
              onClick={handleStop}
              disabled={isLoading}
              className="py-2 px-4 rounded bg-red-600 hover:bg-red-700"
            >
              Stop
            </button>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded overflow-hidden mb-4">
            <div
              className="bg-music-primary h-2"
              style={{ width: `${(progress / duration) * 100 || 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-music-secondary">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SongPlayer;
