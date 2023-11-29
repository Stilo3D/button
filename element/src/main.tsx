import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import App from "./App.tsx";
import "./index.css";
import "./global.css";
import { MessageData } from "./types/interfaces.ts";
import Loader from "./components/Loader/index.tsx";

// Add an event listener for the message data when message data is received render the App with the message data
const messageEventListener = (event: MessageEvent) => {
  const newMessageData: MessageData = event.data || {};
  if (newMessageData.user_details) {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <Provider store={store}>
          <App messageData={newMessageData} />
        </Provider>
      </React.StrictMode>
    );
    window.removeEventListener("message", messageEventListener);
  } else {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <Loader />
      </React.StrictMode>
    );
  }
};

window.addEventListener("message", messageEventListener);

const el = document.getElementById("root")!;

//el.className = "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2";
el.textContent = "Loading...";
