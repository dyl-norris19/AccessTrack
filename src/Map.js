import { Header, Footer } from "./Template";

function Map() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#444040", color: "#6EE05B" }}
    >
      <Header headerTitle={"Map"} />
        <div
          style={{width: "800", height: "600", style: "border:0;", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade"}}
        >
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d53412.27481435245!2d-97.1276288!3d33.2070912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1711310881678!5m2!1sen!2sus"></iframe>
        </div>
      
    </div>
    
    
    
  );
}

export default Map;
