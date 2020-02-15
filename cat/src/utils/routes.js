const express = require("express");
const router = express.Router();
const DbUsers = require("../db/user");
const DbChats = require("../db/chat");
const DbLogs = require("../db/log");

// Getting all chats as a User
router.get("/users/:id", async (req, res) => {
    let chats = await new DbChats(req.params.id).chats();
    console.log(chats);
    let data = {
        chats
    };
    res.send(data).status(200);
});

// Getting group info
router.post("/group", async (req, res) => {
    let { id, then, now } = req.body;
    let media = await new DbLogs(id, then, now).group_logs();
    let chat = await new DbChats().chat(id);
    let users = await new DbUsers().users(id);
    let data = {
        chat,
        media,
        users
    };
    console.log("USERS IS:");
    console.log(users);
    res.send(data).status(200);
});

module.exports = router;
