const express = require("express");
const router = express.Router();
const DbUsers = require("../db/user");
const DbChats = require("../db/chat");
const DbLogs = require("../db/log");

router.get("/users/logs", async (req, res) => {
    let users_logs = await new DbUsers().users_logs();
    if (users_logs) {
        res.send({ users_logs }).status(200);
    } else {
        res.sendStatus(404);
    }
});

router.get("/user/:id/groups", async (req, res) => {
    let user = await new DbUsers(req.params.id).user();
    if (user) {
        let user_chats = await new DbChats(req.params.id).chats();
        user[`user_chats`] = user_chats;
        res.send(user).status(200);
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

router.post("/group", async (req, res) => {
    let { id, then, now } = req.body;
    let logs = await new DbLogs().group_logs(id, then, now);
    let chat = await new DbChats().chat(id);
    let users = await new DbUsers().users();
    let data = {
        chat,
        logs,
        users
    };
    res.send(data).status(200);
});

router.get("/group/:id", async (req, res) => {
    let logs = await new DbLogs().group_logs(req.params.id);
    let chat = await new DbChats().chat(req.params.id);
    let data = {
        chat,
        logs
    };
    res.send(data).status(200);
});

module.exports = router;
