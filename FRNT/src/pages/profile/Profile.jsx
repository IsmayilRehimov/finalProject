import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const [imgFile, setImgFile] = useState(undefined);
  const [profileData, setProfileData] = useState({
    img: currentUser?.img || "",
    desc: currentUser?.desc || "",
    oldPassword: "",
    newPassword: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      alert("Please log in to access your profile.");
      window.location.href = "/login";
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = async () => {
    if (!imgFile) {
      alert("Please select an image first.");
      return;
    }
    setUploading(true);
    try {
      const url = await upload(imgFile);
      setProfileData((prev) => ({ ...prev, img: url }));
      setUploading(false);
      alert("Image uploaded successfully.");
    } catch (err) {
      console.log(err);
      alert("Image upload failed.");
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profileData.newPassword && !profileData.oldPassword) {
      alert("Please enter your current password to change the password.");
      return;
    }

    try {
      const res = await newRequest.put(`/users/${currentUser._id}`, {
        img: profileData.img,
        desc: profileData.desc,
        oldPassword: profileData.oldPassword,
        newPassword: profileData.newPassword,
      });

      alert("Profile updated successfully.");
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await newRequest.delete(`/users/${currentUser._id}`);
      alert("Your account has been deleted.");
      localStorage.removeItem("currentUser");
      navigate("/"); 
    } catch (err) {
      console.log(err);
      alert(err.response?.data || "Failed to delete account.");
    }
  };

  if (!currentUser) return null;

  return (
    <div className="profileContainer">
      <div className="profileSidebar">
        <img src={currentUser.img || "/default-avatar.png"} alt="Profile" />
        <h3>{currentUser.username}</h3>
        <p>{currentUser.email}</p>
        {currentUser.isSeller && <p>{currentUser.desc}</p>}
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? "Close" : "Edit Profile"}
        </button>
      </div>

      {editMode && (
        <form className="profileForm" onSubmit={handleSubmit}>
          <h2>Edit Your Profile</h2>

          <label>Profile Picture</label>
          <input type="file" onChange={(e) => setImgFile(e.target.files[0])} />
          <button type="button" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Image"}
          </button>

          {currentUser.isSeller && (
            <>
              <label>Description</label>
              <textarea
                name="desc"
                value={profileData.desc}
                onChange={handleChange}
              ></textarea>
            </>
          )}

          <label>Current Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter current password"
            value={profileData.oldPassword}
            onChange={handleChange}
          />

          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={profileData.newPassword}
            onChange={handleChange}
          />

          <button type="submit">Save Changes</button>

          <button type="button" className="deleteBtn" onClick={handleDelete}>
            Delete Account
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
