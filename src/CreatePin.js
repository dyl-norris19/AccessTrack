import {createPin, getCurrentUserId} from "./database.js"
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./CreatePin.css";
import { Header, Footer } from "./Template";
import {
  GeoPoint,
  Timestamp,
} from "firebase/firestore";

export function CreatePin(){
  const [newTitle, setTitle] = useState("");
  const [newText, setText] = useState("");
  const [longNum, setLong] = useState("");
  const [latNum, setLat] = useState("");
  const [newPin, isPinMade] = useState(0);
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const createPin2 = () => {
    if (!newTitle) alert("Please enter a title");
    if (isNaN(longNum)) alert("Please enter a number in longitude");
    if (longNum > 180.0) alert("Longitude must be lower than 180");
    if (longNum < -180.0) alert("Longitude must be higer than -180");
    if (isNaN(latNum)) alert("Please enter a number in latitude");
    if (latNum > 90.0) alert("Latitude must be lower than 90");
    if (latNum < -90.0) alert("Latitude must be higer than -90");
    getCurrentUserId().then((uid) => {
      const pin = {
        title: newTitle,
        description: newText,
        location: new GeoPoint(latNum, longNum),
        timestamp: Timestamp.now(),
        creator: uid,
      };
      try {
        createPin(pin);
        isPinMade(1);
      } catch (error) {
        console.error(error);
      }
    });
  }
  useEffect(() => {
      if (loading) return;
      if (newPin == 1) history("/");
  }, [newPin, loading, history]);
  return(
    <div className="d-flex flex-column min-vh-100">
      <Header headerTitle={"Create a Pin"} />
      <div className="register  flex-grow-1 d-flex">
        <div className="create__container">
          <input
            type="text"
            className="create__textBox"
            value={newTitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Pin Title"
          />
          <input
            type="text"
            className="create__textBox"
            value={newText}
            onChange={(e) => setText(e.target.value)}
            placeholder="Description"
          />
          <input
            type="text"
            className="create__textBox"
            value={longNum}
            onChange={(e) => setLong(e.target.value)}
            placeholder="Location Longitude"
          />
          <input
            type="text"
            className="create__textBox"
            value={latNum}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Location Latitude"
          />
          <button className="create__btn" onClick={createPin2}>
            Create Pin
          </button>
          <div>
            <Link to="/dashboard">Cancel Pin</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePin;
