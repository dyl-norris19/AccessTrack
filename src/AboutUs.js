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
          AccessTrack is a user-driven application to map out accessible
          environments. For example, allowing users to mark wheelchair ramps and
          elevators, or give a warning where a degraded sidewalk isn't capable
          of supporting a wheelchair.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
