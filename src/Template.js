import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

function LoginButton() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <a href="/dashboard" className="text-light">
        Profile
      </a>
    );
  }
  return (
    <a href="/login" className="text-light">
      Login
    </a>
  );
}

function CreatePinButton() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <a href="/createPin" className="text-light">
        Create Pin
      </a>
    );
  }
  return (
    <a href="/login" className="text-light">
      Create Pin
    </a>
  );
}

function Logo() {
  return (
    <div className="header-logo">
      <Link to="/">
        <img src="./logo.png" alt="Logo" height="40" />
      </Link>
    </div>
  );
}

export function Header({ headerTitle }) {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <Logo />
      <h1>{headerTitle}</h1>
      <div className="header-links">
        <a href="/" className="text-light">
          Home
        </a>
        <a href="/about" className="text-light">
          About Us
        </a>
        <LoginButton />
        {/* <CreatePinButton /> */}
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
      <p style={centeredTextStyle}> AccessTrack | A Project by HappyCat</p>
      <div>
        <a href="/register" className="text-light me-3">
          Create an Account
        </a>
        <a href="/logout" className="text-light">
          Logout
        </a>
      </div>
    </div>
  );
}

function Template({ headline }) {
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
