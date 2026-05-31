import express from "express";
import sessionRouter from "./session"

const router = express.Router();

/**
 * Root endpoint to verify the server is running.
 */
router.get("/", (_req, res) => {
    res.send({
        status: "success",
        message: "But first, let me take a selfie 🤳 https://www.youtube.com/watch?v=kdemFfbS5H0",
    });
});

router.use("/sessions", sessionRouter)










/**
 * Catch-all route handler for undefined routes.
 * Responds with a 404 error and a helpful message.
 */
router.use((req, res) => {
    // Respond with 404 and a message in JSON-format
    res.status(404).send({
        status: "fail",
        data: {
            message: `Route ${req.method} ${req.path} does not exist`,
        },
    });
});

export default router;



