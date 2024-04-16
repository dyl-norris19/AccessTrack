import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Template";
import AdminDashboard from "./admin-portal/AdminDashboard";
import { Login, Register, Reset, Logout, EditProfile } from "./authentication";
import AboutUs from "./AboutUs";
import { DatabaseStuff } from "./database";
import CreatePin from "./CreatePin";
import Maps from "./Maps";
import ReportPin from "./ReportPin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Maps />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/database" element={<DatabaseStuff />} />
        <Route exact path="/dashboard" element={<EditProfile />} />
        <Route exact path="/createPin" element={<CreatePin />} />
        <Route exact path="/reportPin/:pinID" element={<ReportPin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
