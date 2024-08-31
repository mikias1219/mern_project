import express from 'express';
import {
  createSong,
  getAllSongs,
  updateSong,
  deleteSong,
  getSongStatistics,
} from '../controllers/songController.js';

const router = express.Router();

router.post('/create_songs', createSong);
router.get('/songs', getAllSongs);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);
router.get('/songs/statistics', getSongStatistics);

export default router;
