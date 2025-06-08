import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Calendar } from "./components/Calendar";
import "./index.css";

const appElement = document.getElementById("app");
if (!appElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(appElement);

function App() {
  return <Calendar />;
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
