import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import store from "./store/store.ts";
import App from "./App.tsx";
import "./index.css";
import "./global.css";
import { MessageData } from "./types/interfaces.ts";
import Loader from "./components/Loader/index.tsx";

const el = document.getElementById("root")!;
const root = ReactDOM.createRoot(el);

// Add an event listener for the message data when message data is received render the App with the message data
const messageEventListener = (event: MessageEvent) => {
  const newMessageData: MessageData = event.data || {};
  if (newMessageData.user_details) {
    root.render(
      <React.StrictMode>
        <App messageData={newMessageData} />
      </React.StrictMode>
    );
    window.removeEventListener("message", messageEventListener);
  } else {
    root.render(
      <React.StrictMode>
        <Loader />
      </React.StrictMode>
    );
  }
};

window.addEventListener("message", messageEventListener);
