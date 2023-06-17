import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./index.css";
// import Game from "./Game.tsx";
import GameComponent from "./test.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameComponent/>
  </React.StrictMode>
);
