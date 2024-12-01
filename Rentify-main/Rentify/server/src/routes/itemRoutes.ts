import express from 'express';
import { searchItems } from '../controllers/itemController';

const router = express.Router();

router.get('/search', searchItems);

export default router;

