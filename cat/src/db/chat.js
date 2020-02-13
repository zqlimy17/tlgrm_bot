const Chat = require("../services/models/chat");
const ChatUsers = require("../services/models/chat_users");
const { Op } = require("sequelize");

class DbChats {
    constructor(telegram_id) {
        this.telegram_id = telegram_id;
    }

    // GETTING INFO FOR 1 CHAT
    async chat(id) {
        let chat = await Chat.findAll({
            where: { chat_id: id }
        });
        return chat;
    }

    // GETTING INFO OF MULTIPLE CHATS
    async chats() {
        let chat_users = await ChatUsers.findAll({
            where: { telegram_id: this.telegram_id }
        });
        let chats = await Chat.findAll({
            where: {
                chat_type: {
                    [Op.not]: "private"
                }
            }
        });
        chat_users = chat_users.map(chat_user => {
            let chat = chats.filter(e => e.chat_id == chat_user.chat_id);
            if (chat.length !== 0) {
                chat = chat[0].get();
                chat.user_status = chat_user.chat_user_status;
                return chat;
            }
        });
        chat_users = chat_users.filter(e => !!e);
        return chat_users;
    }
}

module.exports = DbChats;
