import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Maps.css";
import "./CreatePin";
import { uploadImage } from "./storage.js";
import { CreatePin } from "./CreatePin.js";
import { Header, Footer } from "./Template";
import Popup from "reactjs-popup";
import { Link, useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import {
  retrievePins,
  getCurrentUserId,
  createPin,
  averageRatingByPinID,
} from "./database.js";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GeoPoint, Timestamp } from "firebase/firestore";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFsZXluZiIsImEiOiJjbHN5c3hzeTcwZ2pwMmltdXUzdHprYWlsIn0._n2hM1vDIHvaBV8fTORxIw";

const Map = () => {
  const mapContainerRef = useRef(null);
  //center on UNT main campus
  const [lng, setLng] = useState(-97.14);
  const [lat, setLat] = useState(33.21);
  const [newTitle, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [newText, setText] = useState("");
  const history = useNavigate();

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];

    setPhoto(selectedPhoto);
  };

  const [zoom, setZoom] = useState(14);
  const [showPopup, setShowPopup] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent default browser context menu
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/haleynf/cltvx0hq2008j01nogmol3zqa/draft",
      center: [lng, lat],
      zoom: zoom,
    });

    //disable right click rotation - dont currently have a method to reset it
    map.dragRotate.disable();

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    //main click handler
    map.on("click", (e) => {
      //center the map on the coordinates of user click
      map.flyTo({
        center: e.lngLat,
      });

      //set new coords for pin creation
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));

      // create DOM element for the marker
      const el = document.createElement("div");
      el.id = "marker";
    }); //on click ending brackets

    // renders all pins from the database
    retrievePinsForMap(map);

    // Clean up on unmount
    return () => map.remove();
  }, []); //use effect end bracket

  //function for button to dropdown menu
  function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  const replacePopup = () => {
    setShowPopup(false);
    Pins();
  };

  function submitPin() {
    // const photoID = await uploadImage(photo);
    let isWheel = "False";
    let isElev = "False";
    let isCross = "False";
    let isCurb = "False";
    var wheel = document.getElementById("checkOne");
    var elev = document.getElementById("checkTwo");
    var cross = document.getElementById("checkThree");
    var curb = document.getElementById("checkFour");
    if(wheel.checked == true)
    {
       isWheel = "True";
    }
    if(elev.checked == true)
    {
       isElev = "True";
    }
    if(cross.checked == true)
    {
       isCross = "True";
    }
    if(curb.checked == true)
    {
       isCurb = "True";
    }
    getCurrentUserId().then(async (uid) => {
      const pin = {
        title: newTitle,
        description: newText,
        location: new GeoPoint(lat, lng),
        Photo: await uploadImage(photo),
        Wheel = isWheel;
        Elev = isElev;
        Cross = isCross;
        Curb = isCurb;
        timestamp: Timestamp.now(),
        creator: uid,
      };
      try {
        createPin(pin);
        alert("Pin Created!");
        setShowPopup(false);
        reloadPage();
      } catch (error) {
        console.error(error);
      }
    });
  }

  function authLog() 
  {
    history("/login");
  }

  function reloadPage()
  {
      window.location.replace(window.location.origin);
  }

  //function that opens pin creation menu
  function Pins() {
      if(user)
      {
        return (
        <Popup
          open={showPopup}
          closeOnDocumentClick
          onClose={handleClosePopup}
          contentStyle={{
            background: "white",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
          arrow={false}
        >
          <div>
            <div style={{ display: "block", marginBottom: "10px" }}>
              <div>
                <input
                  type="text"
                  id="box"
                  className="create__textBox"
                  value={newTitle}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Pin Title"
                />
                <input
                  type="text"
                  id="boxTwo"
                  className="description_box"
                  value={newText}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Description"
                />
                <label htmlFor="photo" className="form-label">
                  Photo:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ backgroundColor: "#565656", color: "#fff" }}
                />
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Selected"
                    className="mt-2 img-thumbnail"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                <button className="dropbtn" onClick={submitPin}>
                  Submit Pin
                </button>
              </div>
            </div>
            <button
              onClick={handleClosePopup}
              style={{ display: "block", marginBottom: "10px" }}
            >
              Cancel
            </button>
          </div>
        </Popup>
        );
      }
      else
      {
            return(
                <Popup
                open={showPopup}
                closeOnDocumentClick
                onClose={handleClosePopup}
                contentStyle={{
                  background: "white",
                  border: "1px solid #ccc",
                  padding: "20px",
                  borderRadius: "8px",
                }}
                arrow={false}
                >
                <div>
                  <button
                  onClick={authLog}
                  style={{ display: "block", marginBottom: "10px" }}
                  >
                    Login
                  </button>
                  <button
                  onClick={handleClosePopup}
                  style={{ display: "block", marginBottom: "10px" }}
                  >
                    Cancel
                  </button>
                </div>
                </Popup>
            );
      }
  }

  if(user)
  {
    return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#444040", color: "#6EE05B" }}
      onContextMenu={handleContextMenu}
    >
      {" "}
      {/*MAIN DIV*/}
      <Header headerTitle={"Map"} />
      {/* TEMPORARY - JUST TO MAKE SURE COORDS ARE UPDATING*/}
      <div className="sidebar">
        {" "}
        {/*COORD DIV*/}
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainerRef} /> {/*MAP DIV*/}
      <div className="dropdown">
        {" "}
        {/*PIN BUTTON MENU DIV*/}
        <button className="dropbtn" onClick={dropDown}>
          Pins
        </button>{" "}
        {/*INITIAL PIN MENU BUTTON*/}
        <div id="myDropdown" className="dropdown-content">
          {" "}
          {/*PIN DROPDOWN MENU DIV*/}
          <input
            type="checkbox"
            className="dropdown-group"
            value="View All Pins"
          />
          <label className="dropdown-option">View All Pins</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="View Pins Near Me"
          />
          <label className="dropdown-option">View Pins Near Me</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="Wheelchair Ramps"
          />
          <label className="dropdown-option">Wheelchair Ramps</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="Crosswalks"
          />
          <label className="dropdown-option">Crosswalks</label>
          <br />
          <input type="checkbox" className="dropdown-group" value="Elevators" />
          <label className="dropdown-option">Elevators</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="Dropped Curbs"
          />
          <label className="dropdown-option">Dropped Curbs</label>
        </div>{" "}
        {/*PIN DROPDOWN MENU DIV*/}
      </div>{" "}
      {/*PIN BUTTON MENU DIV*/}
      {/*}    </div> {/*PIN POSITION DIV*/}
      <div>
        <Popup
          open={showPopup}
          closeOnDocumentClick
          onClose={handleClosePopup}
          contentStyle={{
            background: "white",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
          arrow={false}
        >
          <div>
            <div style={{ display: "block", marginBottom: "10px" }}>
              <div>
                <input
                  type="text"
                  id="box"
                  className="create__textBox"
                  value={newTitle}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Pin Title"
                />
                <input
                  type="text"
                  id="boxTwo"
                  className="description_box"
                  value={newText}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Description"
                />
                <label htmlFor="photo" className="form-label">
                  Photo:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ backgroundColor: "#565656", color: "#fff" }}
                />
                {photo && (
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Selected"
                    className="mt-2 img-thumbnail"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                <div>
                {" "}
                <label class="container">Wheelchair Ramp
                  <input type="checkbox" id="checkOne"></input>
                  <span class="checkmark"></span>
                </label>
                <label class="container">Elevator
                  <input type="checkbox" id="checkTwo"></input>
                  <span class="checkmark"></span>
                </label>
                <label class="container">Crosswalk
                  <input type="checkbox" id="checkThree"></input>
                  <span class="checkmark"></span>
                </label>
                <label class="container">Dropped Curb
                  <input type="checkbox" id="checkFour"></input>
                  <span class="checkmark"></span>
                </label>
                </div>{" "}
                <button className="dropbtn" onClick={submitPin}>
                  Submit Pin
                </button>
              </div>
            </div>
            <button
              onClick={handleClosePopup}
              style={{ display: "block", marginBottom: "10px" }}
            >
              Cancel
            </button>
          </div>
        </Popup>
      </div>
    </div> /*MAIN DIV*/
  );
  }
  else
  {
    return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#444040", color: "#6EE05B" }}
      onContextMenu={handleContextMenu}
    >
      {" "}
      {/*MAIN DIV*/}
      <Header headerTitle={"Map"} />
      {/* TEMPORARY - JUST TO MAKE SURE COORDS ARE UPDATING*/}
      <div className="sidebar">
        {" "}
        {/*COORD DIV*/}
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainerRef} /> {/*MAP DIV*/}
      <div className="dropdown">
        {" "}
        {/*PIN BUTTON MENU DIV*/}
        <button className="dropbtn" onClick={dropDown}>
          Pins
        </button>{" "}
        {/*INITIAL PIN MENU BUTTON*/}
        <div id="myDropdown" className="dropdown-content">
          {" "}
          {/*PIN DROPDOWN MENU DIV*/}
          <input
            type="checkbox"
            className="dropdown-group"
            value="View All Pins"
          />
          <label className="dropdown-option">View All Pins</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="View Pins Near Me"
          />
          <label className="dropdown-option">View Pins Near Me</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="Wheelchair Ramps"
          />
          <label className="dropdown-option">Wheelchair Ramps</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="Crosswalks"
          />
          <label className="dropdown-option">Crosswalks</label>
          <br />
          <input type="checkbox" className="dropdown-group" value="Elevators" />
          <label className="dropdown-option">Elevators</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="Dropped Curbs"
          />
          <label className="dropdown-option">Dropped Curbs</label>
        </div>{" "}
        {/*PIN DROPDOWN MENU DIV*/}
      </div>{" "}
      {/*PIN BUTTON MENU DIV*/}
      {/*}    </div> {/*PIN POSITION DIV*/}
      <div>
        <Popup
            open={showPopup}
            closeOnDocumentClick
            onClose={handleClosePopup}
              contentStyle={{
                  background: "white",
                  border: "1px solid #ccc",
                  padding: "20px",
                  borderRadius: "8px",
                }}
                arrow={false}
                >
                <div>
                  <button
                  onClick={authLog}
                  style={{ display: "block", marginBottom: "10px" }}
                  >
                    Login
                  </button>
                  <button
                  onClick={handleClosePopup}
                  style={{ display: "block", marginBottom: "10px" }}
                  >
                    Cancel
                  </button>
                </div>
        </Popup>
      </div>
    </div> /*MAIN DIV*/
  );
  }
};

// grabs the pins from the db and renders them
async function retrievePinsForMap(map) {
  try {
    let doc = await retrievePins();
    doc.forEach(async (doc) => {
      const pin = doc.data();
      const [accuracy, quality] = await averageRatingByPinID(doc.id);
      const accuracyDisplay = isNaN(accuracy)
        ? "There are no ratings for this pin yet. Be the First!"
        : accuracy.toFixed(2);
      const qualityDisplay = isNaN(quality)
        ? "There are no ratings for this pin yet. Be the First!"
        : quality.toFixed(2);

      const el = document.createElement("div");
      el.id = "marker";

      const latitude = pin.location.latitude;
      const longitude = pin.location.longitude;

      //create marker
      new mapboxgl.Marker(el)
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div style="font-family: Arial, sans-serif;">
            <h3 style="margin-bottom: 10px; font-size: 18px; color: #333;">${
              pin.title
            }</h3>
            <p style="margin-bottom: 10px; font-size: 14px; color: #666;">${
              pin.description
            }</p>
            <button
              onclick="window.location.href = '/ratePin/' + '${doc.id}'"
                style="display: block; margin-bottom: 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; padding: 10px; cursor: pointer;"
              >
                Rate Pin
            </button>
            <button
              onclick="window.location.href = '/reportPin/' + '${doc.id}'"
                style="display: block; margin-bottom: 10px; background-color: #dc3545; color: white; border: none; border-radius: 5px; padding: 10px; cursor: pointer;"
              >
                Report Pin
            </button>
            ${
              pin.Photo
                ? `<img src="${pin.Photo}" style="width: 100%; height: auto; margin-bottom: 10px; border-radius: 5px;">`
                : ""
            }
            <div style="margin-top: 10px;">
              <strong>Average Accuracy Rating:</strong> ${accuracyDisplay}
              <br>
              <strong>Average Quality Rating:</strong> ${qualityDisplay}
            </div>
          </div>`
          )
        )
        .addTo(map);
    });
  } catch (error) {
    console.error(error);
  }
}

export default Map;
