import { Header, Footer } from "./Template";

function AboutUs() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#444040", color: "#6EE05B" }}
    >
      <Header headerTitle={"About Us"} />
      <h1 style={{ marginLeft: "10%", marginTop: "25px" }}>AccessTrack</h1>

      <div
        style={{ display: "flex", alignItems: "center" }}
        className="container mt-5"
      >
        <img
          src="https://img.freepik.com/premium-vector/city-map-with-pins-town-roads-residential-blocks-gps-navigation-route-with-pointers-abstract-urban-travel-locating-geo-infographic-background_176411-909.jpg?w=996"
          alt="Map with the Pins"
          style={{
            width: "33%",
            marginRight: "20px",
            height: "auto",
            marginBottom: "15px",
          }}
        />
        <p
          style={{
            flex: 1,
            textAlign: "justify",
            lineHeight: "1.5",
            width: "33%",
            marginRight: "200px",
            color: "#fff",
          }}
        >
          AccessTrack is a user-driven web application to map how accessible an
          environment is. Users can mark and rate points of interest using pins
          on a map. Other users can then view those pins, filter what pins they
          see, and rate or report pins. There is also an admin panel, mostly for
          editing and deleting low quality or irrelevant pins.
          <br />
          Right click to add a pin, and left click to view the details of a pin.
          Upon clicking a pin, you will also have the option to rate the pin,
          report it, or navigate to it.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
