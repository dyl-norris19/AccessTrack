import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Template";
import { SignIn } from "./authentication";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Template headline="index.js -> App.js -> Template.js" />}
        />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
