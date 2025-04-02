import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/appContext";
import axios from "axios";
import "../styles/Result.css"; // Importing the External CSS


const Result = () => {
  const { resultImage, image, removeBg } = useContext(AppContext);
  const [background, setBackground] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bgImages, setBgImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const [finalImage, setFinalImage] = useState(null);

  useEffect(() => {
    if (image) {
      setIsLoading(true);
    }
  }, [image]);

  useEffect(() => {
    if (resultImage) {
      setIsLoading(false);
      mergeImages();
    }
  }, [resultImage, background]);

  // Fetch background images from Pexels API
  const fetchImages = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get("https://api.pexels.com/v1/search", {
        params: { query: searchQuery, per_page: 10 },
        headers: { Authorization: "Z0hLaWWNJ6l4MNgOrritOnVKekBGRFc8iFkhCE30BQwAlPAKRNzsekvF" },
      });
      setBgImages(response.data.photos);
    } catch (error) {
      console.error("Image fetch error:", error);
    }
  };

  // Merge Image with Background
  const mergeImages = async () => {
    if (!resultImage) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const original = new Image();
    original.crossOrigin = "anonymous";
    original.src = resultImage;
    await new Promise((resolve) => (original.onload = resolve));

    canvas.width = original.width;
    canvas.height = original.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (background) {
      if (background.startsWith("#")) {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        const bg = new Image();
        bg.crossOrigin = "anonymous";
        bg.src = background;
        await new Promise((resolve) => (bg.onload = resolve));
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
      }
    }

    ctx.drawImage(original, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image
    canvas.toBlob((blob) => {
      setFinalImage(URL.createObjectURL(blob));
    }, "image/png");
  };

  // Download Final Image
  const downloadImage = () => {
    if (!finalImage) return;
    const link = document.createElement("a");
    link.href = finalImage;
    link.download = "final_image.png";
    link.click();
  };

  return (
    <div className="container">
    <div className="image-box">
      <div className="image-grid">
        <div className="image-container">
          <p className="image-title">Original</p>
          <img className="image" src={image ? URL.createObjectURL(image) : null} alt="Original" />
        </div>
        <div className="image-container">
          <p className="image-title">Final Image</p>
          {isLoading && (
            <div className="loader-overlay">
              <div className="loader"></div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden"></canvas>
          {finalImage && <img src={finalImage} className="image final-image" alt="Final Preview" />}
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons-container">
        <label htmlFor="upload3" className="button upload-btn">
          Try another image
        </label>
        <input type="file" accept="image/*" id="upload3" className="hidden" onChange={(e) => removeBg(e.target.files[0])} />
        <button onClick={() => setBackground(null)} className="button reset-btn">
          Reset Background
        </button>
        <button onClick={downloadImage} className="button download-btn">
          Download image
        </button>
      </div>

      {/* Background Selection UI */}
      <div className="background-selector">
        <p className="background-title">🎨 Choose a Background</p>

        {/* Color Palette */}
        <div className="color-palette">
          {[
            "#0F0F0F", "#1C1C1C", "#2F3640", "#4B4B4B", "#F5F5F5", "#EAEAEA",
            "#D6D6D6", "#BDC3C7", "#3498DB", "#F39C12", "#16A085"
          ].map((color) => (
            <div key={color} className="color-box" style={{ backgroundColor: color }} onClick={() => setBackground(color)}></div>
          ))}
        </div>

        {/* Search Box */}
        <div className="search-box">
          <input type="text" placeholder="🔍 Search backgrounds..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
          <button onClick={fetchImages} className="search-btn">Search</button>
        </div>

        {/* Background Images */}
        <div className="background-images">
          {bgImages.map((img) => (
            <img key={img.id} src={img.src.small} className="background-image" onClick={() => setBackground(img.src.large)} alt="Background" />
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Result;

