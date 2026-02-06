import {
  createPlaylist,
  getPlaylist,
  getPlaylists,
} from "#db/queries/playlists";
import {
  createTrack,
  getTrack,
  getTracksByPlaylistId,
} from "#db/queries/tracks";
import { createPlaylistTrack } from "#db/queries/playlist_tracks";
import express from "express";
const router = express.Router();
export default router;

router.get("/", async (req, res, next) => {
  try {
    const playlists = await getPlaylists();
    res.send(playlists);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).send("Request body is not provided.");
    }
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).send("Required fields are not provided.");
    }

    const createdPlaylist = await createPlaylist({ name, description });
    res.status(201).send(createdPlaylist);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      res.status(400).send("Id is not a number.");
    }

    const playlist = await getPlaylist(id);

    if (!playlist) {
      res.status(404).send("Playlist does not exist.");
    }

    res.status(200).send(playlist);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/tracks", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      res.status(400).send("Id is not a number.");
    }

    const playlist = await getPlaylist(id);
    if (!playlist) {
      res.status(404).send("Playlist is not found.");
    }

    const tracksByPlaylistId = await getTracksByPlaylistId(id);
    res.status(200).send(tracksByPlaylistId);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/tracks", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).send("Id is not a number.");
    }

    const playlist = await getPlaylist(id);
    if (!playlist) {
      return res.status(404).send("Playlist is not found.");
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is not provided.");
    }

    const { trackId } = req.body;
    if (!trackId) {
      res.status(400).send("Request body is missing required fields.");
    }

    if (isNaN(Number(trackId))) {
      return res.status(400).send("Id is not a number.");
    }

    const track = await getTrack(trackId);
    if (!track) {
      res.status(400).send("Track is not found.");
    }

    const tracksByPlaylistId = await getTracksByPlaylistId(id);
    const ifTrackAlreadyExist = tracksByPlaylistId.some((eachTrack) => {
      return eachTrack.id === track.id;
    });

    if (ifTrackAlreadyExist) {
      res.status(400).send("Track already exist in playlist");
    }

    const playlistTrack = await createPlaylistTrack({
      playlist_id: id,
      track_id: trackId,
    });

    res.status(201).send(playlistTrack);
  } catch (error) {
    next(error);
  }
});
