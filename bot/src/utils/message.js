const Chat = require("../services/models/chat");
const User = require("../services/models/user");
const Utils = require("../utils/utils");

class Message {
    constructor(from, chat) {
        this.user = from;
        this.chat = chat;
    }

    async telegram_chat_update(data) {
        let chat = await Chat.findOne({
            where: {
                chat_id: JSON.stringify(data)
            }
        });
        if (chat) {
            chat.chat_id = this.chat.id;
            if (this.chat.username) chat.chat_user = this.chat.username;
            chat.chat_type = this.chat.type;
            await chat.save();
            Utils.log(`Chat updated from ${data} to ${chat.chat_id}`);
            return;
        }
    }

    async additional_props(payload) {
        if (payload.hasOwnProperty("migrate_from_chat_id")) {
            Utils.log(`Message has properties of -> migrate_from_chat_id`);
            let migrate_chat = payload.migrate_from_chat_id;
            await this.telegram_chat_update(migrate_chat);
            return;
        }
    }
}
module.exports = Message;
