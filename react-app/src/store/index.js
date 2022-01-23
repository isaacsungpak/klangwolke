import session from "./session";
import songs from "./songs";
import { configureStore } from "@reduxjs/toolkit";

const isDev = process.env.NODE_ENV !== "production";

const store = configureStore({
  reducer: {
    session,
    songs,
  },
  middleware: (getDefaultMiddleware) => {
    if (isDev) {
      const logger = require("redux-logger").default;
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  },
  devTools: isDev,
});

export default store;
