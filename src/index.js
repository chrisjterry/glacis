import React from "react";
import ReactDOM from "react-dom/client";
import Flights from "./pages/Flights";
import AiFlights from "./pages/AiFlights";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Flights /> */}
    <AiFlights />
  </React.StrictMode>
);
