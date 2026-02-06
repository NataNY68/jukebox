import db from "../client.js";

export const createTrack = async ({ name, duration_ms }) => {
  const sql = `INSERT INTO tracks (name, duration_ms)
  VALUES ($1, $2) RETURNING *`;

  const {
    rows: [createdTrack],
  } = await db.query(sql, [name, duration_ms]);
  return createdTrack;
};

export const getTracks = async () => {
  const sql = `SELECT * FROM tracks`;

  const { rows: allTracks } = await db.query(sql);
  return allTracks;
};

export const getTrack = async (id) => {
  const sql = `SELECT * FROM tracks WHERE id= $1`;

  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return track;
};

export const getTracksByPlaylistId = async (playlistId) => {
  const sql = `SELECT tracks.* FROM tracks
  JOIN playlists_tracks
  ON tracks.id = playlists_tracks.track_id
  WHERE playlists_tracks.playlist_id = $1`;

  const { rows: allTracks } = await db.query(sql, [playlistId]);
  return allTracks;
};
