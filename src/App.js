import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Template";
import {
  Login,
  Register,
  Reset,
  Dashboard,
  EditProfile,
} from "./authentication";
import AboutUs from "./AboutUs";
import { DatabaseStuff } from "./database";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/logout" element={<Dashboard />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/database" element={<DatabaseStuff />} />
        <Route exact path="/dashboard" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
