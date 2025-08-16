import express from 'express';

import { userSignupSchema } from '../../validators/usersSchema.js';
import { validate } from '../../validators/zodValidators.js';
import userRoutes from './users.js'

const router = express.Router();

router.use('/users', validate(userSignupSchema), userRoutes);


export default router;