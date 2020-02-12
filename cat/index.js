const express = require("express");
// const cors = require("cors");
const config = require("config");

const app = express();
// app.use(cors());

const router = require("./src/utils/routes");
const PORT = config.get("PORT");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");

//     // Request methods you wish to allow
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );

//     // Request headers you wish to allow
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "X-Requested-With,content-type, Authorization"
//     );

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader("Access-Control-Allow-Credentials", true);

//     // Pass to next layer of middleware
//     next();
// });

app.use(router);
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
