
import React from 'react';
import { assets } from '../assets/assets';
import '../styles/Steps.css';

const Steps = () => {
  return (
    <div className="steps-container">
      <h1 className="steps-heading">
        Steps to remove background <br /> image in seconds
      </h1>
      <div className="steps-wrapper">
        <div className="step-card">
          <img className="step-icon" src={assets.upload_icon} alt="Upload" />
          <div>
            <p className="step-content">Upload image</p>
            <p className="step-text">
              Upload your image and remove the <br /> background instantly for free!
            </p>
          </div>
        </div>

        <div className="step-card">
          <img className="step-icon" src={assets.remove_bg_icon} alt="Remove Background" />
          <div>
            <p className="step-content">Remove background</p>
            <p className="step-text">
              Remove image backgrounds instantly <br /> with AI for free and effortlessly!
            </p>
          </div>
        </div>

        <div className="step-card">
          <img className="step-icon" src={assets.download_icon} alt="Download" />
          <div>
            <p className="step-content">Download image</p>
            <p className="step-text">
              Download your background-free image <br /> instantly with high-quality results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
