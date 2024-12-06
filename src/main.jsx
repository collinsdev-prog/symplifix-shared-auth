import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import SharedContextProvider from "./context/SharedContextProvider/SharedContextProvider.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SharedContextProvider>
          <App />
        </SharedContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
