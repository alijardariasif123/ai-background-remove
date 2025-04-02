// Header.jsx

import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/appContext';
import '../styles/Header.css'; // Import CSS file

const Header = () => {
    const { removeBg } = useContext(AppContext);

    return (
        <div className="header-container">
            {/* Left Section */}
            <div className="header-left">
                <h1>
                    Remove the <br className="hide-on-mobile"/>
                    <span className="header-highlight">background</span> from <br className="hide-on-mobile"/>
                    images for free.
                </h1>
                <p className="header-description">
                    Effortlessly remove backgrounds from images for free with AI-powered precision.
                    <br className="hide-on-mobile"/> Get clean, high-quality cutouts in seconds—no software or expertise needed!
                </p>

                {/* Upload Button */}
                <div>
                    <input className="upload-input" onChange={e => removeBg(e.target.files[0])} type="file" accept="image/*" id="upload1" hidden />
                    <label className="upload-btn" htmlFor="upload1">
                        <img src={assets.upload_btn_icon} alt="Upload" />
                        <p>Upload your image</p>
                    </label>
                </div>
            </div>

            {/* Right Section */}
            <div className="header-right">
                <img src={assets.header_img} alt="Header Illustration" />
            </div>
        </div>
    );
}

export default Header;
