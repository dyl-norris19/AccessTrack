import {createPin, getCurrentUserId} from "./database.js"
import React, { useState } from "react";
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
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();

  function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
  }

  function checkPin()
  {
        if (!newTitle) alert("Please enter a title")
        if (isNaN(longNum)) alert("Please enter a number in longitude")
        if (longNum > 180.0) alert("Longitude must be lower than 180")
        if (longNum < -180.0) alert("Longitude must be higer than -180")
        if (isNaN(latNum)) alert("Please enter a number in latitude")
        if (latNum > 90.0) alert("Latitude must be lower than 90")
        if (latNum < -90.0) alert("Latitude must be higer than -90")

        assert((!newTitle) || (isNaN(longNum)) || (longNum > 180.0) ||
            (longNum < -180.0) || (isNaN(latNum)) || (latNum > 90.0) || (latNum < -90.0));
        if ((!newTitle) || (isNaN(longNum)) || (longNum > 180.0) ||
            (longNum < -180.0) || (isNaN(latNum)) || (latNum > 90.0) || (latNum < -90.0))
        {
           return 1;
        }
        return 0;
  }
  
  const createPin2 = () => {
    if(checkPin() == 0)
    {
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
          history("/")
        } catch (error) {
          console.error(error);
        }
      });
    }
    else
    {
      history("/createPin");
    }
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
