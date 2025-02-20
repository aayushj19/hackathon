const Thread = require("../models/Thread");
const asyncHandler = require("express-async-handler");

const createThread = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    const thread = new Thread({
        user: req.user._id,
        title,
        content,
    });

    const createdThread = await thread.save();
    res.status(201).json(createdThread);
});

const getThreads = asyncHandler(async (req, res) => {
    const threads = await Thread.find().populate("user", "name");
    res.json(threads);
});

const getThreadById = asyncHandler(async (req, res) => {
    const thread = await Thread.findById(req.params.id).populate("user", "name");

    if (thread) {
        res.json(thread);
    } else {
        res.status(404);
        throw new Error("Thread not found");
    }
});

const replyToThread = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const thread = await Thread.findById(req.params.id);

    if (thread) {
        const reply = {
            user: req.user._id,
            content,
        };

        thread.replies.push(reply);
        await thread.save();
        res.status(201).json({ message: "Reply added" });
    } else {
        res.status(404);
        throw new Error("Thread not found");
    }
});

const likeThread = asyncHandler(async (req, res) => {
    const thread = await Thread.findById(req.params.id);

    if (thread) {
        if (thread.likes.includes(req.user._id)) {
            return res.status(400).json({ message: "You already liked this thread" });
        }

        thread.likes.push(req.user._id);
        await thread.save();
        res.status(200).json({ message: "Thread liked" });
    } else {
        res.status(404);
        throw new Error("Thread not found");
    }
});

module.exports = {
    createThread,
    getThreads,
    getThreadById,
    replyToThread,
    likeThread
};
