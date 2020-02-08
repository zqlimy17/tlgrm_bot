const express = require("express");
const router = express.Router();
const DbUsers = require("../db/user");

router.get("/users", async (req, res) => {
    let users = await DbUsers.users();
    if (users) {
        res.send({ users }).status(200);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
