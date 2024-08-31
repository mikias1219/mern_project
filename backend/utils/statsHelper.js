export const calculateStats = (songs) => {
  const totalSongs = songs.length;
  const genres = {};
  const artists = {};

  songs.forEach(song => {
    genres[song.genre] = (genres[song.genre] || 0) + 1;
    artists[song.artist] = artists[song.artist] || { songCount: 0, albumCount: new Set() };
    artists[song.artist].songCount += 1;
    artists[song.artist].albumCount.add(song.album);
  });

  Object.keys(artists).forEach(artist => {
    artists[artist].albumCount = artists[artist].albumCount.size;
  });

  return {
    totalSongs,
    genres,
    artists,
  };
};
