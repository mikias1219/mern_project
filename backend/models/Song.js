import mongoose from 'mongoose';

// Define the schema for the Song model
const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Song title is required'],
    trim: true, 
  },
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true, 
  },
  album: {
    type: String,
    required: [true, 'Album name is required'],
    trim: true,
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true, 
  },
 
}, {
  timestamps: true, 
});

// Create the Song model
const Song = mongoose.model('Song', songSchema);

export default Song;
