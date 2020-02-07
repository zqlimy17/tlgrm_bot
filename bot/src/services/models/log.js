const { sequelize, DataTypes } = require("./sequelize");

let Log = sequelize.define(
    "log",
    {
        telegram_id: { type: DataTypes.INTEGER, allowNull: false },
        chat_id: { type: DataTypes.STRING, allowNull: false },
        text: { type: DataTypes.TEXT }
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

module.exports = Log;
