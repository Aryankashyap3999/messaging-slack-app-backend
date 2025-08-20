import express from 'express';

import { forgotPassword } from '../../controllers/forgetPasswordController.js';
import { resetPassword } from '../../controllers/resetPasswordController.js';

const router = express.Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;