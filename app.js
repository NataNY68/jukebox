import express from "express";
const app = express();

import playlistsRouter from "./api/playlistsRouter.js";
import tracksRouter from "./api/tracksRouter.js";

app.use(express.json());

app.use("/playlists", playlistsRouter);
app.use("/tracks", tracksRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});

export default app;
