const { sequelize, DataTypes } = require("./sequelize");

let User = sequelize.define(
    "user",
    {
        telegram_id: { type: DataTypes.INTEGER, allowNull: false },
        first_name: { type: DataTypes.STRING },
        username: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        is_bot: { type: DataTypes.BOOLEAN },
        language: { type: DataTypes.STRING }
    },
    {
        paranoid: true,
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at"
    }
);

module.exports = User;
