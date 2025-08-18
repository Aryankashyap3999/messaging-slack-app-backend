import express from 'express';

import { getMessages } from '../../controllers/messageController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// router.get('/pre-signed-url', isAuthenticated, getPresignedUrlFromAWS);
router.get('/:channelId', isAuthenticated, getMessages);


export default router;
