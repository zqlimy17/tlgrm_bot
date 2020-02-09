const Chat = require("../services/models/chat");
const { Op } = require("sequelize");

class DbChats {
    constructor(telegram_id) {
        this.telegram_id = telegram_id;
    }
    async chats() {
        let chats = await Chat.findAll({
            where: {
                chat_owner: this.telegram_id,
                chat_type: {
                    [Op.not]: "private"
                }
            }
        });
        if (chats) return chats;
    }
}

module.exports = DbChats;
