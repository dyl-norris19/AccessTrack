import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Template";
import { Login, Register, Reset, Dashboard } from "./authentication";
import AdminDashboard from "./admin-portal/AdminDashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Template headline="index.js -> App.js -> Template.js" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
