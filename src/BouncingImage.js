import React, { useState, useEffect } from "react";
import "./styles.css";

const BouncingImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isBouncing, setIsBouncing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (imageUrl.trim() !== "") {
      setIsBouncing(true);
    }
  }, [imageUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isBouncing) {
      const frame = document.querySelector(".frame");
      const image = frame.querySelector("img");
      const boundingBox = frame.getBoundingClientRect();

      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;
      let xDirection = 1;
      let yDirection = 1;

      const animate = () => {
        x += xDirection * 2;
        y += yDirection * 2;

        if (x + boundingBox.width >= window.innerWidth || x <= 0) {
          xDirection *= -1;
        }

        if (y + boundingBox.height >= window.innerHeight || y <= 0) {
          yDirection *= -1;
        }

        image.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        image.style.transform = "translate(0, 0)";
        setIsBouncing(false);
      };
    }
  }, [isBouncing]);

  const handleBounce = () => {
    if (imageUrl.trim() === "") {
      setError("Please upload an image.");
    } else {
      setIsBouncing(true);
    }
  };

  return (
    <div className="container">
      {!isBouncing ? (
        <div className="input-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="input-button"
          />
          <label>
            {"  "}
            once the image is uploaded the image will start bouncing
          </label>
        </div>
      ) : (
        <div className="frame">
          <img src={imageUrl} alt="Bouncing" />
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default BouncingImage;
