import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createTrack } from "./queries/tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { createPlaylistTrack } from "./queries/playlist_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const tracksList = [];
  const playlistsList = [];

  //Create 20 tracks
  for (let i = 0; i < 20; i++) {
    const randomTrackName = faker.music.songName();
    const randomDuration = Math.floor(
      Math.random() * (300000 - 180000 + 1) + 180000,
    );
    const createdTrack = await createTrack({
      name: `${randomTrackName}_${i}`,
      duration_ms: randomDuration,
    });
    tracksList.push(createdTrack);
  }

  //Create 10 playlists
  for (let i = 0; i < 10; i++) {
    const randomPlaylistName = faker.music.album();
    const randomDescription = faker.lorem.words({ min: 3, max: 5 });
    const createdPlaylist = await createPlaylist({
      name: randomPlaylistName,
      description: randomDescription,
    });
    playlistsList.push(createdPlaylist);
  }

  //Create at least 15 playlist-tracks

  const uniquePairs = new Set();

  for (let i = 0; i < 15; i++) {
    const randomTrack =
      tracksList[Math.floor(Math.random() * tracksList.length)];
    const randomPlaylist =
      playlistsList[Math.floor(Math.random() * playlistsList.length)];

    const key = `${randomPlaylist.id}-${randomTrack.id}`;

    if (uniquePairs.has(key)) {
      continue;
    }

    await createPlaylistTrack({
      playlist_id: randomPlaylist.id,
      track_id: randomTrack.id,
    });

    uniquePairs.add(key);
  }
}
