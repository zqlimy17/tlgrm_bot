const User = require("../models/user");
const Chat = require("../models/chat");
const Log = require("../models/log");
const Utils = require("../../utils/utils");
const Telegram = require("../telegram");

class Db {
    constructor(from, chat, text) {
        this.user = from ? from : "";
        this.chat = chat ? chat : "";
        this.text = text ? text : "";
    }

    async telegram_user(user) {
        let data = {
            telegram_id: user ? user.id : this.user.id,
            first_name: user ? user.first_name : this.user.first_name,
            username: user ? user.username : this.user.username,
            last_name: user ? user.last_name : this.user.last_name,
            is_bot: user ? user.is_bot : this.user.is_bot,
            language: user ? user.language_code : this.user.language_code
        };
        user = await User.findOne({
            where: {
                telegram_id: user ? user.id : this.user.id
            }
        });
        if (!user) {
            user = await User.create(data);
            Utils.log("[User created]", user.telegram_id);
        } else {
            Utils.log("[User exist]", user.telegram_id);
        }
        return user.get();
    }

    async telegram_chat() {
        let chat = await Chat.findOne({
            where: {
                chat_id: JSON.stringify(this.chat.id)
            }
        });
        if (!chat) {
            let creator, chat_size;
            if (this.chat.type !== "private") {
                creator = await new Telegram(this.chat).get_chat_creator();
                let index = creator.result.findIndex(c => c.status === "creator");
                creator = creator.result[index];
                creator = await this.telegram_user(creator.user);
                chat_size = await new Telegram(this.chat).get_chat_members_count();
            }
            let data = {
                chat_id: this.chat.id,
                chat_name: this.chat.title ? this.chat.title : null,
                chat_type: this.chat.type,
                chat_username: this.chat.username ? this.chat.username : null,
                chat_size: chat_size ? chat_size.result : null,
                chat_owner: creator ? creator.telegram_id : this.chat.id
            };
            chat = await Chat.create(data);
            Utils.log("[Chat created]", chat.chat_id);
        } else {
            Utils.log("[Chat exist]", chat.chat_id);
        }
        return;
    }

    async telegram_log(message_id) {
        let data = {
            telegram_id: this.user.id,
            chat_id: this.chat.id,
            message_id,
            text: this.text
        };
        data = await Log.create(data);
        Utils.log("[Log created]", `user_id -> ${data.telegram_id}`, `message_id -> ${message_id}`);
    }

    static async telegram_chat_update(data, new_chat) {
        let chat = await Chat.findOne({
            where: {
                chat_id: JSON.stringify(data)
            }
        });
        if (chat) {
            chat.chat_id = new_chat.id;
            if (new_chat.username) chat.chat_user = new_chat.username;
            chat.chat_type = new_chat.type;
            chat.save();
            Utils.log(`Chat updated from ${data} to ${chat.chat_id}`);
            return;
        }
    }

    async processing_data(message_id) {
        await this.telegram_user();
        await this.telegram_chat();
        this.telegram_log(message_id);
    }
}

module.exports = Db;
