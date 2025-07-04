import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiPlus, FiX, FiDollarSign, FiClock, FiEdit2 } from "react-icons/fi";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = () => {
    const feature = featureInput.trim();
    if (!feature) return;
    
    dispatch({
      type: "ADD_FEATURE",
      payload: feature,
    });
    setFeatureInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFeature();
    }
  };

  const handleUpload = async () => {
    if (!singleFile || files.length === 0) {
      alert("Please select both cover image and additional images");
      return;
    }
    
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => newRequest.post("/gigs", gig),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
    onError: (err) => {
      console.error("Mutation error:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.cover || state.images.length === 0) {
      alert("Please upload images before submitting");
      return;
    }
    mutation.mutate(state);
  };

  return (
    <div className="add">
      <div className="container">
        <div className="header">
          <h1>
            <FiEdit2 className="icon" /> Create New Gig
          </h1>
          <p>Fill in the details to create your service offering</p>
        </div>

        <form className="gig-form" onSubmit={handleSubmit}>
          <div className="form-sections">
            <div className="main-section">
              <div className="form-group">
                <label>Service Title</label>
                <input
                  type="text"
                  name="title"
                  value={state.title}
                  placeholder="e.g. Professional website design"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="cat" value={state.cat} onChange={handleChange} required>
                  <option value="" disabled>Select a category</option>
                  <option value="design">Design</option>
                  <option value="web">Web Development</option>
                  <option value="animation">Animation</option>
                  <option value="music">Music</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="business">Business</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="writing">Writing & Translation</option>
                  <option value="data">Data</option>
                  <option value="photography">Photography</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="desc"
                  value={state.desc}
                  placeholder="Describe your service in detail..."
                  rows="6"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="image-upload">
                <div className="upload-group">
                  <label>Cover Image</label>
                  <div className="file-input">
                    <FiUpload className="upload-icon" />
                    <span>{singleFile ? singleFile.name : "Select cover image"}</span>
                    <input
                      type="file"
                      onChange={(e) => setSingleFile(e.target.files[0])}
                      accept="image/*"
                      required
                    />
                  </div>
                </div>

                <div className="upload-group">
                  <label>Additional Images</label>
                  <div className="file-input">
                    <FiUpload className="upload-icon" />
                    <span>
                      {files.length > 0 
                        ? `${files.length} file${files.length > 1 ? 's' : ''} selected` 
                        : "Select additional images"}
                    </span>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setFiles([...e.target.files])}
                      accept="image/*"
                    />
                  </div>
                </div>

                <button 
                  type="button" 
                  className="upload-btn" 
                  onClick={handleUpload}
                  disabled={uploading || !singleFile || files.length === 0}
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                </button>

                {state.cover && (
                  <div className="upload-status">
                    <span className="success">✓ Images uploaded successfully</span>
                  </div>
                )}
              </div>
            </div>

            <div className="details-section">
              <div className="form-group">
                <label>Short Title</label>
                <input
                  type="text"
                  name="shortTitle"
                  value={state.shortTitle}
                  placeholder="e.g. Premium website package"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Short Description</label>
                <textarea
                  name="shortDesc"
                  value={state.shortDesc}
                  placeholder="Brief summary of your service"
                  rows="3"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label><FiClock /> Delivery Time (days)</label>
                  <input
                    type="number"
                    name="deliveryTime"
                    min="1"
                    value={state.deliveryTime}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Revisions</label>
                  <input
                    type="number"
                    name="revisionNumber"
                    min="0"
                    value={state.revisionNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Features</label>
                <div className="add-feature">
                  <input 
                    type="text" 
                    placeholder="e.g. Responsive design"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    type="button"
                    className="add-feature-btn"
                    onClick={handleFeature}
                  >
                    <FiPlus /> Add
                  </button>
                </div>
                <div className="features-list">
                  {state.features.map((f) => (
                    <div className="feature-tag" key={f}>
                      {f}
                      <button
                        type="button"
                        onClick={() =>
                          dispatch({ type: "REMOVE_FEATURE", payload: f })
                        }
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label><FiDollarSign /> Price ($)</label>
                <input
                  type="number"
                  name="price"
                  min="5"
                  value={state.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={mutation.isLoading || !state.cover}
            >
              {mutation.isLoading ? "Creating..." : "Create Gig"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;