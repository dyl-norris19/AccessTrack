import { Header, Footer } from "./Template";

function Map() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#444040", color: "#6EE05B" }}
    >
      <Header headerTitle={"Map"} />
        <div
          style={{title: "Navigation", style: "border:none;"}}
       >
        <iframe width='100%' height='613px' src="https://api.mapbox.com/styles/v1/haleynf/cltvx0hq2008j01nogmol3zqa.html?title=copy&access_token=pk.eyJ1IjoiaGFsZXluZiIsImEiOiJjbHN5c3hzeTcwZ2pwMmltdXUzdHprYWlsIn0._n2hM1vDIHvaBV8fTORxIw&zoomwheel=true&fresh=true#13.09/33.2084/-97.14749"></iframe>          
        </div>
      
    </div>
    
  );
}

export default Map;
