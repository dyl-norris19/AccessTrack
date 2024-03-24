import { Header, Footer } from "./Template";

function Map() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#444040", color: "#6EE05B" }}
    >
      <Header headerTitle={"Map"} />
      <h1 style={{ marginLeft: "10%", marginTop: "25px" }}>AccessTrack</h1>

      <div
        style={{ display: "flex", alignItems: "center" }}
        className="container mt-5"
      >
        
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
          Test
        </p>
      </div>
    </div>
  );
}

export default Map;
