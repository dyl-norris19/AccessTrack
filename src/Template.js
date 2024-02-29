function Header() {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <div className="header-logo">
        <img src="../public/logo.png" alt="Logo" height="40" />
      </div>
      <h1>Header Title</h1>
      <div className="header-links">
        <a href="/" className="text-light">
          Home
        </a>
        <a href="#" className="text-light">
          About Us
        </a>
        <a href="#" className="text-light">
          (either login and sign up, or logout)
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>Team Sad Cat FTW!</p>
    </div>
  );
}

function Template({ headline }) {
  // can put sub-functions, objects, variables here if desired

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ "background-color": "#444040" }}
    >
      <Header />
      <div class="content flex-grow-1">
        <h2>{headline}</h2>
      </div>
      <Footer />
    </div>
  );
}

export default Template;
