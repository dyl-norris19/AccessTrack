import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Maps.css";
import "./CreatePin";
import { CreatePin } from "./CreatePin.js";
import { Header, Footer } from "./Template";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFsZXluZiIsImEiOiJjbHN5c3hzeTcwZ2pwMmltdXUzdHprYWlsIn0._n2hM1vDIHvaBV8fTORxIw";

const Map = () => {
  const mapContainerRef = useRef(null);
  //center on UNT main campus
  const [lng, setLng] = useState(-97.14);
  const [lat, setLat] = useState(33.21);
  const [zoom, setZoom] = useState(14);
  let click = false; //variable for right click handling
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
      click = false; //reset click to false

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

      //create marker
      new mapboxgl.Marker(el).setLngLat(e.lngLat).addTo(map);

      //after user sets a marker, set to true to prep for pin menu
      click = true;
    }); //on click ending brackets

    // //second click handler, leads to pin creation menu
    // map.on("mouseover", (e) => {
    //   if ((click = true)) {
    //     //needs user to create marker before accessing pin menu
    //     map.on("contextmenu", function (e) {
    //       pins(); //function that opens the window to pin creation
    //     });
    //   }
    // });

    // Clean up on unmount
    return () => map.remove();
  }, []); //use effect end bracket

  //function for button to dropdown menu
  function dropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  //function that opens pin creation menu
  function pins() {
    window.open("/createPin", "noopener");
  }

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
      <div class="dropdown">
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
          <label class="dropdown-option">View All Pins</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="View Pins Near Me"
          />
          <label class="dropdown-option">View Pins Near Me</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="Wheelchair Ramps"
          />
          <label class="dropdown-option">Wheelchair Ramps</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="Crosswalks"
          />
          <label class="dropdown-option">Crosswalks</label>
          <br />
          <input type="checkbox" className="dropdown-group" value="Elevators" />
          <label class="dropdown-option">Elevators</label>
          <br />
          <input
            type="checkbox"
            className="dropdown-group"
            value="Dropped Curbs"
          />
          <label class="dropdown-option">Dropped Curbs</label>
        </div>{" "}
        {/*PIN DROPDOWN MENU DIV*/}
      </div>{" "}
      {/*PIN BUTTON MENU DIV*/}
      {/*   HTML FOR NEW CREATE PIN MENU - NEEDS EDITING
        <div className="pinposition">
          <div className="box">
            Create Pin
          <div className="textbox">
           title
          </div>
          <div className="textbox">
            description
          </div>
          <div className="textbox">
           location
          </div>
          <div className="textbox">
           tags
          </div>
          <div className="confirm" onClick={pins}>
            <b>Jump to create pin page</b>
          </div>
          <div className="exit">
            Cancel
          </div>
          </div> {/*BOX DIV*/}
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
              onClick={() => pins()}
              style={{ display: "block", marginBottom: "10px" }}
            >
              Create Pin
            </button>
            <button
              onClick={() => console.log("Rate Pin clicked")}
              style={{ display: "block", marginBottom: "10px" }}
            >
              Rate Pin
            </button>
            <button
              onClick={() => console.log("Report Pin clicked")}
              style={{ display: "block", marginBottom: "10px" }}
            >
              Report Pin
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
};

export default Map;
