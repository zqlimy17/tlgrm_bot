const { Sequelize, DataTypes } = require("sequelize");
const config = require("config");
const psql_url = "postgres://mohammadasshikin@localhost:5432/tlgrm";

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
