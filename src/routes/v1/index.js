import express from 'express';

import channelRoutes from './channels.js'
import userRoutes from './users.js'
import workspaceRoutes from './workspaces.js'

const router = express.Router();

router.use('/users', userRoutes);

router.use('/workspaces', workspaceRoutes);

router.use('/channels', channelRoutes);


export default router;