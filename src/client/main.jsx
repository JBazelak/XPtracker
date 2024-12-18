import React from "react";
import App from './App'
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  </React.StrictMode>,
);
