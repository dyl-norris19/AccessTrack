export function Header({ headerTitle }) {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <div className="header-logo">
        <img src="../public/logo.png" alt="Logo" height="40" />
      </div>
      <h1>{headerTitle}</h1>
      <div className="header-links">
        <a href="/" className="text-light">
          Home
        </a>
        <a href="#" className="text-light">
          About Us
        </a>
        <a href="/login" className="text-light">
          Login
        </a>
      </div>
    </div>
  );
}

export function Footer() {
  const centeredTextStyle = {
    flex: 1,
    textAlign: "center",
    margin: 0,
  };
  return (
    <div className="footer d-flex justify-content-between align-items-center">
      <p style={centeredTextStyle}>Team Sad Cat FTW!</p>
      <a href="/register" className="text-light">
        Create an Account
      </a>
    </div>
  );
}

function Template({ headline }) {
  // can put sub-functions, objects, variables here if desired

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#444040" }}
    >
      <Header headerTitle={"Template Page"} />
      <div className="content flex-grow-1">
        <h2>{headline}</h2>
      </div>
      <Footer />
    </div>
  );
}

export default Template;
