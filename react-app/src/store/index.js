import { configureStore } from "@reduxjs/toolkit";

import session from "./session";
import songs from "./songs";
import playlists from "./playlists";

const isDev = process.env.NODE_ENV !== "production";

const store = configureStore({
  reducer: {
    session,
    songs,
    playlists
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
