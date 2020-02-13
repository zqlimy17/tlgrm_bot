const { sequelize, DataTypes } = require("./sequelize");

let ChatUsers = sequelize.define(
    "chat_users",
    {
        chat_id: { type: DataTypes.STRING, allowNull: false },
        telegram_id: { type: DataTypes.INTEGER, allowNull: false },
        referrer_telegram_id: { type: DataTypes.INTEGER },
        chat_user_status: { type: DataTypes.STRING }
    },
    {
        paranoid: true,
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

module.exports = ChatUsers;
