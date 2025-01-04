import React from "react";
import UserProfile from "../components/Profile/UserProfie";

const ProfilePage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen
 bg-music-background text-white p-6"
    >
      <h1 className="text-3xl font-bold text-music-primary mb-6">
        Your Profile
      </h1>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
