import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store.js";
import SharedContextProvider from "./context/SharedContextProvider/SharedContextProvider.jsx";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SharedContextProvider>
          <App />
        </SharedContextProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
