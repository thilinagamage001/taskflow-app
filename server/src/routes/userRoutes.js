import { Router } from 'express';
import { getProfile, updateProfile, changePassword, uploadAvatar } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { updateProfileValidator, changePasswordValidator } from '../validators/userValidator.js';
import validate from '../middleware/validate.js';

const router = Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfileValidator, validate, updateProfile);
router.put('/password', auth, changePasswordValidator, validate, changePassword);
router.put('/avatar', auth, upload.single('avatar'), uploadAvatar);

export default router;
