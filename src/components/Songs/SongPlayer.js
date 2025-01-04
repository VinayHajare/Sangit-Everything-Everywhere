import React, { useCallback, useEffect, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import api from "../../utils/api";

const SongPlayer = () => {
  const { currentSong, clearSong } = usePlayer();
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handleTimeUpdate = useCallback(() => {
    if (audio) {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    }
  }, [audio]);

  const handleSongEnd = useCallback(() => {
    clearSong();
    setIsPlaying(false);
    setProgress(0);
  }, [clearSong]);

  useEffect(() => {
    if (!currentSong) return;

    const fetchSongStream = async () => {
      try {
        const response = await api.get(`/stream/play/${currentSong.id}`, {
          responseType: "blob",
        });
        const url = URL.createObjectURL(response.data);

        const audioElement = new Audio(url);
        audioElement.addEventListener("timeupdate", handleTimeUpdate);
        audioElement.addEventListener("ended", handleSongEnd);

        if (audio) {
          audio.pause();
          audio.removeEventListener("timeupdate", handleTimeUpdate);
          audio.removeEventListener("ended", handleSongEnd);
        }

        setAudio(audioElement);
        setError("");
      } catch {
        setError("Failed to stream the song. Please try again.");
        clearSong();
      }
    };

    fetchSongStream();

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [currentSong, audio, handleTimeUpdate, handleSongEnd, clearSong]);

  const handlePlay = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
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
              disabled={isPlaying}
              className={`py-2 px-4 rounded ${
                isPlaying
                  ? "bg-gray-600"
                  : "bg-music-primary hover:bg-green-600"
              }`}
            >
              Play
            </button>
            <button
              onClick={handlePause}
              disabled={!isPlaying}
              className={`py-2 px-4 rounded ${
                isPlaying
                  ? "bg-music-primary hover:bg-green-600"
                  : "bg-gray-600"
              }`}
            >
              Pause
            </button>
            <button
              onClick={handleStop}
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
