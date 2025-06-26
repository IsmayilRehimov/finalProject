import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
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
      dispatch({ type: "RESET_FORM" });
      setSingleFile(undefined);
      setFiles([]);
      navigate("/mygigs");
    },
    onError: (err) => {
      console.error("Mutation error:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={state.title}
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label>Category</label>
            <select name="cat" value={state.cat} onChange={handleChange}>
              <option value="" disabled>
                Choose a category
              </option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="marketing">Digital Marketing</option>
              <option value="business">Business</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="writing">Writing & Translate</option>
              <option value="data">Data</option>
              <option value="photography">Photography</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label>Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label>Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button className="uploadBtn" onClick={handleUpload}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <label>Description</label>
            <textarea
              name="desc"
              value={state.desc}
              placeholder="Brief description to introduce your service"
              rows="10"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="details">
            <label>Service Title</label>
            <input
              type="text"
              name="shortTitle"
              value={state.shortTitle}
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label>Short Description</label>
            <textarea
              name="shortDesc"
              value={state.shortDesc}
              placeholder="Short description of your service"
              rows="4"
              onChange={handleChange}
            ></textarea>
            <label>Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              name="deliveryTime"
              value={state.deliveryTime}
              onChange={handleChange}
            />
            <label>Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              value={state.revisionNumber}
              onChange={handleChange}
            />
            <label>Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button className="addFeatureBtn" type="submit">Add</button>
            </form>
            <div className="addedFeatures">
              {state.features.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f} <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={state.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="createBtn" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
