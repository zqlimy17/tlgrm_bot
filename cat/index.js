const express = require("express");
const config = require("config");
const router = require("./src/utils/routes");
const app = express();
const PORT = config.get("PORT");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
