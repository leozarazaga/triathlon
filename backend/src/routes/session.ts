/**
	
	session router
*/

import express from "express";
import { index } from "../controllers/session_controller";

const router = express.Router();

/**
	
	get all sessions
*/

router.get("/", index);

export default router;
