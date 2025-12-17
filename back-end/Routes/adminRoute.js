import express from "express";
import { adminLogin, getEmail, PostMessage,getEmailId,deleteEmail,checkAuth } from "../Controller/adminController.js";
import { protectAdmin } from "../Middleware/adminMiddleware.js";
const router = express.Router();
router.post("/login",adminLogin)
router.post('/message',PostMessage)
router.get('/message',getEmail),
router.get('/message/:id',getEmailId),
router.delete('/message/:id',deleteEmail)
router.get('/check-auth', protectAdmin, checkAuth);
export default router;