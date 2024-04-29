import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { useParams } from "react-router-dom";

// Initialize Mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiaGFsZXluZiIsImEiOiJjbHN5c3hzeTcwZ2pwMmltdXUzdHprYWlsIn0._n2hM1vDIHvaBV8fTORxIw";

function Navigation() {
  const { destination } = useParams();
  const [destLat, destLng] = destination.split(",");
  const [userLng, setUserLng] = useState(null);
  const [userLat, setUserLat] = useState(null);

  useEffect(() => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });

    function successLocation(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      setUserLng(lng);
      setUserLat(lat);

      // Initialize the map centered at the user's location
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: 13,
      });

      // Add a marker for the user's location
      const userMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

      // Add a marker for the destination location
      const destMarker = new mapboxgl.Marker({ color: "red" })
        .setLngLat([destLng, destLat])
        .addTo(map);

      // Add navigation control
      map.addControl(new mapboxgl.NavigationControl());

      // Initialize Mapbox Directions plugin
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        profile: "mapbox/walking",
        interactive: false,
        controls: {
          instructions: true,
          // inputs: false,
        },
      });

      // Add Directions plugin to the map
      map.addControl(directions, "top-left");

      // Set origin and destination
      directions.setOrigin([lng, lat]);
      console.log("added origin");
      directions.setDestination([destLng, destLat]);
      console.log("added destination");
    }

    function errorLocation() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  return <div id="map" style={{ width: "100%", height: "500px" }} />;
}

export default Navigation;
