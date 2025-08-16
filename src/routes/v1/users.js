import express from 'express';

import { signinController, signupController } from '../../controllers/userController.js';
import { userSignupSchema, usersSigninSchema } from '../../validators/usersSchema.js';
import { validate } from '../../validators/zodValidators.js';

const router = express.Router();

router.post('/signup', validate(userSignupSchema), signupController);

router.post('/signin', validate(usersSigninSchema), signinController)

export default router;
 