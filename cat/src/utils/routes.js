const express = require("express");
const router = express.Router();
const DbUsers = require("../db/user");
const DbChats = require("../db/chat");
const DbLogs = require("../db/log");
const Telegram = require("../services/telegram");

// Getting single user info

router.get("/user/:id", async (req, res) => {
    let user = await new DbUsers(req.params.id).user();
    console.table(user);
    let data = {
        user
    };
    res.send(data).status(200);
});

// Getting all chats as a User
router.get("/users/:id", async (req, res) => {
    let chats = await new DbChats(req.params.id).chats();
    console.log(chats);
    let data = {
        chats
    };
    res.send(data).status(200);
});

// getting profile photo
router.get("/group/:id/profile-photo", async (req, res) => {
    let photo = await new Telegram().chat_profile(req.params.id);
    console.log(photo);
    let photo_url = `https://api.telegram.org/file/bot997286944:AAHOONG3DMu6CGEdZliBZj_PR2NA9Tz-KZg/${photo}`;
    let data = { photo_url };
    res.send(data).status(200);
});

router.get("/user/:id/profile-photo", async (req, res) => {
    let photo = await new Telegram().user_profile(req.params.id);
    console.log("PHOTO IS", photo);
    let photo_url = `https://api.telegram.org/file/bot997286944:AAHOONG3DMu6CGEdZliBZj_PR2NA9Tz-KZg/${photo}`;
    let data = { photo_url };
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
    res.send(data).status(200);
});

router.get("/group/:id", async (req, res) => {
    let count = await new DbLogs().group_media_length(req.params.id);
    let data = { count };
    res.send(data).status(200);
});

module.exports = router;
