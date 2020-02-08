const express = require("express");
const config = require("config");
const Webhooks = require("./src/utils/webhook");
const Db = require("./src/services/db");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || config.get("port");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/users", async (req, res) => {
    let users = await Db.get_users();
    console.log(users);
    if (users) {
        res.send(users).status(200);
    } else {
        res.sendStatus(404);
    }
});

router.post("/", async (req, res) => {
    try {
        res.sendStatus(202);
        let webhook_message = req.body;
        new Webhooks().filter(webhook_message);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

app.use(router);
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
