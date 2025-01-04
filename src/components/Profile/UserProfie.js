import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../utils/api";

const UserProfile = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [profile, setProfile] = useState(null); // User profile details
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    bio: "",
    profilePicture: "",
  });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${user.username}`);
        setProfile(response.data);
        setFormData({
          bio: response.data.bio || "",
          profilePicture: response.data.profilePicture || "",
        });
        setError("");
      } catch (err) {
        setError("Failed to fetch profile details. Please try again.");
      }
    };

    fetchProfile();
  }, [user.username]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setSuccess("");
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/profile/${user.username}`, formData);
      setProfile({ ...profile, ...formData });
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setError("");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      setSuccess("");
    }
  };

  if (!profile) {
    return <div className="bg-music-background text-white p-6">Loading...</div>;
  }

  return (
    <div className="bg-music-background text-white p-6">
      {error && <div className="bg-red-500 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 p-3 rounded mb-4">{success}</div>}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Username:</h3>
          <p className="text-sm text-music-secondary">{profile.username}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Email:</h3>
          <p className="text-sm text-music-secondary">{profile.email}</p>
        </div>
        {isEditing ? (
          <>
            <div>
              <h3 className="text-xl font-semibold">Bio:</h3>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 rounded text-white"
              ></textarea>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Profile Picture URL:</h3>
              <input
                type="text"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-800 rounded text-white"
              />
            </div>
            <button
              onClick={handleSave}
              className="mt-4 bg-music-primary py-2 px-4 rounded text-black hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={handleEditToggle}
              className="mt-4 ml-4 bg-gray-600 py-2 px-4 rounded text-white hover:bg-gray-700"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div>
              <h3 className="text-xl font-semibold">Bio:</h3>
              <p className="text-sm text-music-secondary">{profile.bio}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Profile Picture:</h3>
              {profile.profilePicture && (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mt-2"
                />
              )}
            </div>
            <button
              onClick={handleEditToggle}
              className="mt-4 bg-music-primary py-2 px-4 rounded text-black hover:bg-green-600"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
