// Routes/uploadRoutes.js
import express from 'express';
import { uploadImage } from '../Controller/uploadController.js';
import { protectAdmin } from '../Middleware/adminMiddleware.js';

const router = express.Router();

router.post('/image', protectAdmin, uploadImage);

export default router;