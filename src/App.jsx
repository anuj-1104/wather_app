import React from "react";
import { Routes, Route } from "react-router-dom";
import WeatherApp from "./pages/Main";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WeatherApp />} />

        {/*Not Match a Root */}
        <Route path="/*" element={<WeatherApp />} />
      </Routes>
    </div>
  );
};

export default App;
