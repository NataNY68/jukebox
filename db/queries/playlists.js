import db from "../client.js";

export const createPlaylist = async ({ name, description }) => {
  const sql = `INSERT INTO playlists (name, description)
  VALUES ($1, $2) RETURNING *`;

  const {
    rows: [createdPlaylist],
  } = await db.query(sql, [name, description]);
  return createdPlaylist;
};

export const getPlaylists = async () => {
  const sql = `SELECT * FROM playlists`;

  const { rows: allPlaylists } = await db.query(sql);
  return allPlaylists;
};

export const getPlaylist = async (id) => {
  const sql = `SELECT * FROM playlists WHERE id=$1`;

  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
};
