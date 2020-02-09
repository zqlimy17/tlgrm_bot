const express = require("express");
const router = express.Router();
const DbUsers = require("../db/user");
const DbChats = require("../db/chat");

router.get("/users/logs", async (req, res) => {
    let users_logs = await new DbUsers().users_logs();
    if (users_logs) {
        res.send({ users_logs }).status(200);
    } else {
        res.sendStatus(404);
    }
});

router.get("/users/:id", async (req, res) => {
    let user_chats = await new DbChats(req.params.id).chats();
    if (user_chats) {
        res.send({ user_chats }).status(200);
    } else {
        res.sendStatus(404);
    }
});

router.get("/users/chats", async (req, res) => {
    let users_chats = await new DbUsers().users_chats();
    if (users_chats) {
        res.send({ users_chats }).status(200);
    } else {
        res.sendStatus(404);
    }
});

router.get("/users", async (req, res) => {
    let users = await new DbUsers().users();
    if (users) {
        res.send({ users }).status(200);
    } else {
        res.sendStatus(404);
    }
});

router.get("/group/:id", async (req, res) => {
    let logs = await new DbLogs().group_logs();
    if (logs) {
        res.send({ logs }).status(200);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
