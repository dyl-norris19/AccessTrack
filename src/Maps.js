import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Maps.css';
import './CreatePin';
import { CreatePin } from "./CreatePin.js";
import { Header, Footer } from "./Template";
import {Marker, NavigationControl} from 'react-map-gl'; //not used yet/even necessary ?

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFsZXluZiIsImEiOiJjbHN5c3hzeTcwZ2pwMmltdXUzdHprYWlsIn0._n2hM1vDIHvaBV8fTORxIw";


const Map = () => {
  const mapContainerRef = useRef(null);
  //center on UNT main campus
  const [lng, setLng] = useState(-97.14);
  const [lat, setLat] = useState(33.21);
  const [zoom, setZoom] = useState(14);
  let dbl = false;


  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/haleynf/cltvx0hq2008j01nogmol3zqa/draft",
      center: [lng, lat],
      zoom: zoom
    });

    map.dragRotate.disable(); //disable right click rotation - dont currently have a method to reset it

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    //center the map on the coordinates of user click -  ORIGINAL
    map.on('click', (e) => {

            //set new coords for pin creation
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));

      new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML("Create Pin?", pins())
          .addTo(map);
  

      map.flyTo({
          center: e.lngLat
      });
      

      //popup - ORIGINAL
      //this one doesnt create multiple popups
      {/*}
      dbl = false;
      setTimeout(() => {
        if(!dbl){
          new mapboxgl.Marker()
          .setLngLat(e.lngLat)
      //    .setHTML(pins())
        //  .setPopup(popup)
          .addTo(map);
         
        }
      })*/}


  }); //on click ending brackets


    // Clean up on unmount
    return () => map.remove();
  }, []); //use effect end bracket

    //function for button to dropdown menu
    function dropDown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    function pins(){
      window.open('/createPin', 'noopener');
    }


  return( 
    
    <div
    className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#444040", color: "#6EE05B" }}> {/*MAIN DIV*/}
    <Header headerTitle={"Map"} /> 

      {/* TEMPORARY - JUST TO MAKE SURE COORDS ARE UPDATING*/}
      <div className="sidebar"> {/*COORD DIV*/}
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>

        <div className="map-container" ref={mapContainerRef} /> {/*MAP DIV*/}

        <div class="dropdown"> {/*PIN BUTTON MENU DIV*/}
        <button className="dropbtn" onClick={dropDown}>Pins</button> {/*INITIAL PIN MENU BUTTON*/}
            <div id="myDropdown" className="dropdown-content"> {/*PIN DROPDOWN MENU DIV*/}
            <input type="checkbox" className="dropdown-group" value="View All Pins" />
            <label class="dropdown-option">View All Pins</label><br/>
        
            <input type="checkbox" className="dropdown-group" value="View Pins Near Me" />
            <label class="dropdown-option">View Pins Near Me</label><br/>
        
            <input type="checkbox" className="dropdown-group" value="Wheelchair Ramps" />
            <label class="dropdown-option">Wheelchair Ramps</label><br/>
        
            <input type="checkbox" className="dropdown-group" value="Crosswalks" />
            <label class="dropdown-option">Crosswalks</label><br/>
        
            <input type="checkbox" className="dropdown-group" value="Elevators" />
            <label class="dropdown-option">Elevators</label><br/>
        
            <input type="checkbox" className="dropdown-group" value="Dropped Curbs" />
            <label class="dropdown-option">Dropped Curbs</label>
            </div> {/*PIN DROPDOWN MENU DIV*/}
        </div> {/*PIN BUTTON MENU DIV*/}

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

    </div>/*MAIN DIV*/
  );
}


export default Map;

