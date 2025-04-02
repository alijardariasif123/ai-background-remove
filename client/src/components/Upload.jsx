
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/appContext";
import "../styles/Upload.css"; // Importing the External CSS

const Upload = () => {
  const { removeBg } = useContext(AppContext);

  return (
    <div className="upload-container">
      <h1 className="upload-title">See the magic. Try now</h1>
      <div className="upload-btn-container">
        <input
          onChange={(e) => removeBg(e.target.files[0])}
          type="file"
          accept="image/*"
          id="upload2"
          className="upload-input"
        />
        <label htmlFor="upload2" className="upload-label">
          <img src={assets.upload_btn_icon} alt="Upload" className="upload-icon" />
          <p className="upload-text">Upload your image</p>
        </label>
      </div>
    </div>
  );
};

export default Upload;
