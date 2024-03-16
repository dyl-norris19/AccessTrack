import {createPin, getCurrentUserId} from "./database.js"
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./CreatePin.css";
import { Header, Footer } from "../Template";
import {
  GeoPoint,
  Timestamp,
} from "firebase/firestore";

export function CreatePin(){
  const [newTitle, setTitle] = useState("");
  const [newText, setText] = useState("");
  const [longNum, setLong] = useState("");
  const [latNum, setLat] = useState("");
  const [newLocation, setLocation] = useState(new GeoPoint(0.0, 0.0));
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const createPin = () => {
    if (!newTitle) alert("Please enter a title");
    if (isNaN(longNum)) alert("Please enter a number in longitude");
    if (isNaN(longNum)) alert("Please enter a number in latitude");
    setLocation(new GeoPoint(longNum, latNum));
    getCurrentUserId().then((uid) => {
      const pin = {
        title: newTitle,
        description: newText,
        location: newLocation,
        timestamp: Timestamp.now(),
        creator: uid,
      };
      try {
        createPin(pin);
        history("/dashboard", { replace: true });
      } catch (error) {
        console.error(error);
      }
    });
  }
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
          <button className="create__btn" onClick={createPin}>
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
