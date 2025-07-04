import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";
import { 
  FiEdit, 
  FiTrash2, 
  FiUpload, 
  FiUser, 
  FiMail, 
  FiLock, 
  FiSave,
  FiMapPin,
  FiCalendar
} from "react-icons/fi";
import { toast } from "react-toastify";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const [imgFile, setImgFile] = useState(null);
  const [profileData, setProfileData] = useState({
    img: currentUser?.img || "",
    desc: currentUser?.desc || "",
    location: currentUser?.location || "",
    oldPassword: "",
    newPassword: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      toast.warn("Please log in to access your profile.");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = async () => {
    if (!imgFile) {
      toast.warn("Please select an image first.");
      return;
    }
    
    setUploading(true);
    try {
      const url = await upload(imgFile);
      setProfileData((prev) => ({ ...prev, img: url }));
      toast.success("Profile picture updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (profileData.newPassword && !profileData.oldPassword) {
      toast.warn("Please enter your current password to change the password.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await newRequest.put(`/users/${currentUser._id}`, {
        img: profileData.img,
        desc: profileData.desc,
        location: profileData.location,
        oldPassword: profileData.oldPassword,
        newPassword: profileData.newPassword,
      });

      toast.success("Profile updated successfully!");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      await newRequest.delete(`/users/${currentUser._id}`);
      toast.success("Your account has been deleted.");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete account.");
    }
  };

  if (!currentUser) return null;

  // Format join date
  const joinDate = new Date(currentUser.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="profilePage">
      <div className="container">
        <div className="profileHeader">
          <h1><FiUser /> My Profile</h1>
          <button 
            className={`editToggle ${editMode ? 'active' : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? (
              <>
                <FiEdit /> Cancel Editing
              </>
            ) : (
              <>
                <FiEdit /> Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="profileContent">
          <div className="profileCard">
            <div className="avatarContainer">
              <img 
                src={profileData.img || "/img/noavatar.jpg"} 
                alt="Profile" 
                className="profileAvatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/img/noavatar.jpg";
                }}
              />
              {editMode && (
                <div className="avatarActions">
                  <label className="uploadButton">
                    <FiUpload /> Change Photo
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setImgFile(e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {imgFile && (
                    <button 
                      className="uploadButton"
                      onClick={handleUpload}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Save Photo"}
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="userInfo">
              <h2>{currentUser.username}</h2>
              <p className="email"><FiMail /> {currentUser.email}</p>
              
              <div className="userMeta">
                <p className="location"><FiMapPin /> {profileData.location || "Not specified"}</p>
                <p className="joinDate"><FiCalendar /> Member since {joinDate}</p>
              </div>

              {(currentUser.isSeller || profileData.desc) && (
                <div className="description">
                  <h3>About {currentUser.isSeller ? "Me" : "User"}</h3>
                  <p>{profileData.desc || "No description provided"}</p>
                </div>
              )}
            </div>
          </div>

          {editMode && (
            <form className="editForm" onSubmit={handleSubmit}>
              <div className="formGroup">
                <label>
                  <FiEdit /> Description
                </label>
                <textarea
                  name="desc"
                  value={profileData.desc}
                  onChange={handleChange}
                  placeholder="Tell others about yourself..."
                />
              </div>

              <div className="formGroup">
                <label>
                  <FiMapPin /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  placeholder="Where are you based?"
                />
              </div>

              <div className="formGroup">
                <label>
                  <FiLock /> Current Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Enter current password to make changes"
                  value={profileData.oldPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label>
                  <FiLock /> New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={profileData.newPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="formActions">
                <button type="submit" className="saveButton" disabled={isLoading}>
                  <FiSave /> {isLoading ? "Saving..." : "Save Changes"}
                </button>
                <button 
                  type="button" 
                  className="deleteButton"
                  onClick={handleDelete}
                >
                  <FiTrash2 /> Delete Account
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;