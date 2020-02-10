const { sequelize, DataTypes } = require("./sequelize");

let ChatUserLocation = sequelize.define(
    "chat_user_location",
    {
        telegram_id: { type: DataTypes.INTEGER, allowNull: false },
        chat_id: { type: DataTypes.STRING, allowNull: false },
        latitude: { type: DataTypes.STRING, allowNull: false },
        longitude: { type: DataTypes.STRING, allowNull: false }
    },
    {
        paranoid: true,
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

module.exports = ChatUserLocation;
