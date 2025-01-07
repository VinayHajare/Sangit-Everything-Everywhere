import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import PrivateRoute from "./routes/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SongList from "./components/Songs/SongList";
import SongSearch from "./components/Songs/SongSearch";
import PlaylistCreate from "./components/Playlists/PlaylistCreate";
import PlaylistList from "./components/Playlists/PlaylistList";
import PlaylistView from "./components/Playlists/PlaylistView";
import RecommendedSongs from "./components/Discover/RecommendedSongs";
import PlaybackHistory from "./components/Discover/PlaybackHistory";
import FollowArtist from "./components/Discover/FollowArtist";
import ProfilePage from "./pages/ProfilePage";
import SongPlayer from "./components/Songs/SongPlayer";

const App = () => {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <div className="relative">
            <div className="pb-20 bg-music-background"> {/* Add padding-bottom to match the height of the SongPlayer */}
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/songs"
                  element={
                    <PrivateRoute>
                      <SongList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/songs/search"
                  element={
                    <PrivateRoute>
                      <SongSearch />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/playlists"
                  element={
                    <PrivateRoute>
                      <PlaylistList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/playlists/create"
                  element={
                    <PrivateRoute>
                      <PlaylistCreate />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/playlists/:playlistId"
                  element={
                    <PrivateRoute>
                      <PlaylistView />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/discover"
                  element={
                    <PrivateRoute>
                      <RecommendedSongs />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <PrivateRoute>
                      <PlaybackHistory />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/follow"
                  element={
                    <PrivateRoute>
                      <FollowArtist />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>

            <div className="sticky bottom-0 w-full">
              <SongPlayer />
            </div>
          </div>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
};

export default App;
