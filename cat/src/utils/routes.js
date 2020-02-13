const express = require("express");
const router = express.Router();
const DbUsers = require("../db/user");
const DbChats = require("../db/chat");
const DbLogs = require("../db/log");

router.get("/users/:id", async (req, res) => {
    let chats = await new DbChats(req.params.id).chats();
    console.log(chats);
    let data = {
        chats
    };
    res.send(data).status(200);
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
