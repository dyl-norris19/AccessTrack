import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Template";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Template headline="index.js -> App.js -> Template.js" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
