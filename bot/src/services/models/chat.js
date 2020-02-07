const { sequelize, DataTypes } = require("./sequelize");

let Chat = sequelize.define(
    "chat",
    {
        chat_id: { type: DataTypes.STRING, allowNull: false },
        chat_name: { type: DataTypes.STRING },
        chat_type: { type: DataTypes.STRING },
        chat_username: { type: DataTypes.STRING },
        chat_size: { type: DataTypes.INTEGER },
        chat_owner: { type: DataTypes.INTEGER }
    },
    {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

module.exports = Chat;
