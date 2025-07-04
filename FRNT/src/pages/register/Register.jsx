import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiGlobe, FiPhone, FiUpload, FiCheck } from "react-icons/fi";

function Register() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    phone: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors(prev => ({...prev, [e.target.name]: ''}));
    }
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!user.username) newErrors.username = 'Username is required';
    if (!user.email) newErrors.email = 'Email is required';
    if (!user.password) newErrors.password = 'Password is required';
    if (user.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (user.isSeller && !user.desc) newErrors.desc = 'Description is required for sellers';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setUploading(true);
    try {
      let url = "";
      if (file) {
        url = await upload(file);
      }
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      alert('Registration successful! Please login.');
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="left">
            <h1>Create a new account</h1>
            
            <div className="form-group">
              <label htmlFor="username">
                <FiUser /> Username
              </label>
              <input
                name="username"
                type="text"
                placeholder="Enter your username"
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FiMail /> Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <FiLock /> Password
              </label>
              <input 
                name="password" 
                type="password" 
                placeholder="Enter your password"
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="country">
                <FiGlobe /> Country
              </label>
              <input
                name="country"
                type="text"
                placeholder="Enter your country"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="file">
                <FiUpload /> Profile Picture (Optional)
              </label>
              <div className="file-input">
                <input 
                  type="file" 
                  id="file" 
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    if (errors.file) setErrors(prev => ({...prev, file: ''}));
                  }} 
                />
                <label htmlFor="file" className="file-label">
                  {file ? file.name : 'Choose a file'}
                </label>
              </div>
            </div>

            <button type="submit" disabled={uploading}>
              {uploading ? 'Registering...' : 'Register'}
            </button>
          </div>

          <div className="right">
            <h1>Become a Seller</h1>
            
            <div className="toggle-group">
              <label className="toggle-label">
                <span>Activate seller account</span>
                <label className="switch">
                  <input type="checkbox" onChange={handleSeller} />
                  <span className="slider round"></span>
                </label>
              </label>
            </div>

            {user.isSeller && (
              <>
                <div className="form-group">
                  <label htmlFor="phone">
                    <FiPhone /> Phone Number
                  </label>
                  <input
                    name="phone"
                    type="text"
                    placeholder="+1 234 567 89"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    placeholder="Tell us about your services"
                    name="desc"
                    onChange={handleChange}
                    className={errors.desc ? 'error' : ''}
                  />
                  {errors.desc && <span className="error-message">{errors.desc}</span>}
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;