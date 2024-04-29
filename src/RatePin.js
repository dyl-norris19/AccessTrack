import React, { useState, useEffect } from "react";
import { createRating, getCurrentUserId } from "./database";
import { useParams } from "react-router-dom";
import { Header, Footer } from "./Template";
import "./ReportPin.css";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { Rating } from "react-simple-star-rating";

function RatePin() {
  const { pinID } = useParams();
  const [newText, setText] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [quality, setQuality] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUserId() {
      const id = await getCurrentUserId();
      setUserId(id);
    }
    fetchUserId();
  }, []);

  async function createRatingMine() {
    const report = {
      accuracy: accuracy,
      creatorID: userId,
      description: newText,
      pinID: pinID,
      quality: quality,
      Timestamp: Timestamp.now(),
    };

    await createRating(report);
    alert("Rating Submitted");
    window.location.href = "/";
  }

  // Catch Rating value
  const handleQuality = (rate) => {
    setQuality(rate);
  };
  const handleAccuracy = (rate) => {
    setAccuracy(rate);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header headerTitle={"Rate Pin"} />
      <div className="register  flex-grow-1 d-flex">
        <div className="create__container">
          <textarea
            type="text"
            className="create__textBox"
            value={newText}
            onChange={(e) => setText(e.target.value)}
            placeholder="Rating Review"
          />
          <p>Quality</p>
          <Rating
            onClick={handleQuality}
            // onPointerEnter={onPointerEnter}
            // onPointerLeave={onPointerLeave}
            // onPointerMove={onPointerMove}
            /* Available Props */
          />
          <p>Accuracy</p>
          <Rating
            onClick={handleAccuracy}
            // onPointerEnter={onPointerEnter}
            // onPointerLeave={onPointerLeave}
            // onPointerMove={onPointerMove}
            /* Available Props */
          />

          <button className="create__btn" onClick={createRatingMine}>
            Submit Rating
          </button>
          <div>
            <Link to="/">Cancel Rating</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RatePin;
