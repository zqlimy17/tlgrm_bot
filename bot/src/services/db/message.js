const Chat = require("../models/chat");
const Utils = require("../../utils/utils");
const Db = require("./db");
const ChatUsers = require("../models/chat_users");
const ChatUserImage = require("../models/chat_user_image");

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

    async telegram_chat_new_member(new_user) {
        new_user = await new Db().telegram_user(new_user);
        if (new_user) {
            let data = {};
            let chat_users = await ChatUsers.findOne({
                where: {
                    chat_id: JSON.stringify(this.chat.id),
                    telegram_id: new_user.telegram_id
                }
            });
            if (!chat_users) {
                data.chat_id = this.chat.id;
                data.telegram_id = new_user.telegram_id;
                if (new_user.telegram_id != this.user.id) data.referrer_telegram_id = this.user.id;
                data.chat_user_status = "member";
                await new Db(this.user, this.chat).telegram_chat("update");
                await ChatUsers.create(data);
                Utils.log(
                    `[ChatUsers created]`,
                    `chat_id--> ${data.chat_id}`,
                    `telegram_id--> ${data.telegram_id}`
                );
                return;
            }
        }
    }

    async telegram_chat_left_member(left_user) {
        left_user = await ChatUsers.findOne({
            where: {
                chat_id: JSON.stringify(this.chat.id),
                telegram_id: left_user.id,
                deleted_at: null
            }
        });
        if (left_user) left_user.destroy();
        await new Db(this.user, this.chat).telegram_chat("update");
        Utils.log(`[ChatUsers deleted]`, `user deleted`);
        return;
    }

    async telegram_media(image, caption) {
        let data = {
            telegram_id: this.user.id,
            chat_id: this.chat.id,
            file_id: image.file_id,
            file_unique_id: image.file_unique_id,
            caption
        };
        ChatUserImage.create(data);
        Utils.log(
            `[ChatUserImage created]`,
            `user_id--> ${this.user.id}`,
            `file_unique_id--> ${data.file_unique_id}`
        );
        return;
    }

    async additional_props(payload) {
        if (payload.hasOwnProperty("migrate_from_chat_id")) {
            Utils.log(`Message has properties of -> migrate_from_chat_id`);
            let migrate_chat = payload.migrate_from_chat_id;
            await this.telegram_chat_update(migrate_chat);
            return;
        } else if (payload.hasOwnProperty("new_chat_member")) {
            Utils.log(`Message has properties of -> new_chat_member`);
            await this.telegram_chat_new_member(payload.new_chat_member);
            return;
        } else if (payload.hasOwnProperty("left_chat_member")) {
            Utils.log(`Message has properties of -> left_chat_member`);
            await this.telegram_chat_left_member(payload.left_chat_member);
            return;
        } else if (payload.hasOwnProperty("photo")) {
            let image = payload.photo[1];
            let caption = payload.caption ? payload.caption : null;
            await this.telegram_media(image, caption);
            return;
        }
        return;
    }
}
module.exports = Message;