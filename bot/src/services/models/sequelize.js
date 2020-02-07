const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(config.get("psql_url"), {
    timezone: "+08:00",
    logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log("PSQL Connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = { Sequelize, sequelize, DataTypes };
