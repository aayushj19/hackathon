const express = require("express");
const { createThread, getThreads, upvoteThread, addMessage } = require("../controllers/threadController");

const router = express.Router();

router.post("/", createThread);
router.get("/", getThreads);
router.post("/:id/upvote", upvoteThread);
router.post("/message", addMessage); // New route to add messages

module.exports = router;
