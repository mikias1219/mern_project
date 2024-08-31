  
import Song from '../models/songModel.js';
import { calculateStats } from '../utils/statsHelper.js';
 // Adjust the path as needed

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    console.log('Fetched Songs:', songs);  // Log the fetched songs
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const createSong = async (req, res) => {
  const { title, artist, album, genre } = req.body;

  try {
    const song = new Song({ title, artist, album, genre });
    const createdSong = await song.save();
    res.status(201).json(createdSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSong = async (req, res) => {
  const { id } = req.params;
  const { title, artist, album, genre } = req.body;

  try {
    const song = await Song.findById(id);
    if (song) {
      song.title = title;
      song.artist = artist;
      song.album = album;
      song.genre = genre;

      const updatedSong = await song.save();
      res.json(updatedSong);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findById(id);
    if (song) {
      await song.remove();
      res.json({ message: 'Song removed' });
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const songs = await Song.find();
    const stats = calculateStats(songs);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
