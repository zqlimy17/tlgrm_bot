const { sequelize, DataTypes } = require("./sequelize");

let ChatUserDoc = sequelize.define(
    "chat_user_doc",
    {
        telegram_id: { type: DataTypes.INTEGER, allowNull: false },
        chat_id: { type: DataTypes.STRING, allowNull: false },
        file_name: { type: DataTypes.STRING },
        file_type: { type: DataTypes.STRING },
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

module.exports = ChatUserDoc;
