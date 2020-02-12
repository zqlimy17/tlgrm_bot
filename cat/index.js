const express = require("express");
// const cors = require("cors");
const config = require("config");

const app = express();
// app.use(cors());

const router = require("./src/utils/routes");
const PORT = config.get("PORT");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
