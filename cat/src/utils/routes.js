const express = require("express");
const router = express.Router();
const DbUsers = require("../db/user");

router.get("/users/logs", async (req, res) => {
    let users_logs = await new DbUsers().users_logs();
    if (users_logs) {
        res.send({ users_logs }).status(200);
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

module.exports = router;
