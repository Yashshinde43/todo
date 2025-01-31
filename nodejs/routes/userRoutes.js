import express from "express";
import { createUser, loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/createuser', createUser);
router.post('/logoutuser', logoutUser);
router.post('/loginuser', loginUser);
export default router;