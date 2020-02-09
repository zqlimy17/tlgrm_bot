const { sequelize, DataTypes } = require("./sequelize");

let ChatUserImage = sequelize.define(
    "chat_user_image",
    {
        telegram_id: { type: DataTypes.INTEGER, allowNull: false },
        chat_id: { type: DataTypes.STRING, allowNull: false },
        file_id: { type: DataTypes.STRING, allowNull: false },
        file_unique_id: { type: DataTypes.STRING },
        caption: { type: DataTypes.STRING }
    },
    {
        paranoid: true,
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

module.exports = ChatUserImage;
