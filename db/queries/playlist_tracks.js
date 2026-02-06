import db from "../client.js";

export const createPlaylistTrack = async ({ playlist_id, track_id }) => {
  const sql = `INSERT INTO playlists_tracks (playlist_id, track_id)
  VALUES ($1, $2) RETURNING *`;

  const {
    rows: [createdPlaylistTrack],
  } = await db.query(sql, [playlist_id, track_id]);
  return createdPlaylistTrack;
};

// export const getTracksByPlaylistId = async (playlistId) => {
//   const sql = `SELECT tracks.* FROM tracks
// JOIN playlists_tracks
// ON tracks.id = playlists_tracks.tracks_id
// WHERE playlists_tracks.playlist_id =$1`;

//   const { rows: allTracks } = await db.query(sql, [playlistId]);
//   return allTracks;
// };
