  
import express from 'express';
import { getSongs, createSong, updateSong, deleteSong, getStats } from '../controllers/songController.js';

const router = express.Router();

router.route('/')
  .get(getSongs)
  .post(createSong);

router.route('/:id')
  .put(updateSong)
  .delete(deleteSong);

router.route('/stats')
  .get(getStats);

export default router;
