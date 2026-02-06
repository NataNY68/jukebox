import { getTrack, getTracks } from "#db/queries/tracks";
import express from "express";
const router = express.Router();
export default router;

router.get("/", async (req, res, next) => {
  try {
    const tracks = await getTracks();
    res.send(tracks);
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

    const foundTrack = await getTrack(id);
    if (!foundTrack) {
      res.status(404).send("Track is not found");
    }

    res.status(200).send(foundTrack);
  } catch (error) {
    next(error);
  }
});
