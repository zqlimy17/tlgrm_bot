const { sequelize, DataTypes } = require("./sequelize");

let ChatUserVideo = sequelize.define(
    "chat_user_video",
    {
        telegram_id: { type: DataTypes.INTEGER, allowNull: false },
        chat_id: { type: DataTypes.STRING, allowNull: false },
        duration: { type: DataTypes.INTEGER },
        length: { type: DataTypes.INTEGER },
        file_id: { type: DataTypes.STRING, allowNull: false },
        file_unique_id: { type: DataTypes.STRING }
    },
    {
        paranoid: true,
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

module.exports = ChatUserVideo;
