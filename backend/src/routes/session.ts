import express from "express";
import { index, update } from "../controllers/session_controller";

const router = express.Router();

/**
 * GET /sessions
 */
router.get("/", index);

/**
 * PATCH /sessions/sessionId:
 */

router.patch("/:sessionId", update);
// Make sure this matches your route definition (e.g., router.patch('/:id', update))

export default router;
