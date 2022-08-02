// React imports
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Styles
import "./index.css";
// Components
import App from "./App";
// Performance
import reportWebVitals from "./reportWebVitals";

// 👇ID of the element in HTML file
const rootElement = document.getElementById("root");
// create a root - 👉  root is a top-level data structure that React uses to track a tree to render
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
