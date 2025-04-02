import React, { useState } from 'react';
import { assets } from '../assets/assets';
import '../styles/BgSlider.css'; // Ensure you link the CSS file

const BgSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    };

    return (
        <div className="bg-slider-container">
            {/* Title */}
            <h1 className="bg-slider-title">
                Remove Background With High <br /> Quality and Accuracy
            </h1>
            
            <div className="bg-slider-wrapper">
                {/* Background Image */}
                <img 
                    src={assets.image_w_bg} 
                    className="bg-slider-image" 
                    style={{ clipPath: `inset(0 ${100.2 - sliderPosition}% 0 0)` }} 
                    alt="Background" 
                />
                
                {/* Foreground Image */}
                <img 
                    src={assets.image_wo_bg} 
                    className="bg-slider-foreground" 
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }} 
                    alt="Foreground" 
                />
                
                {/* Slider */}
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderPosition} 
                    onChange={handleSliderChange} 
                    className="bg-slider-range" 
                />
            </div>
        </div>
    );
};

export default BgSlider;
