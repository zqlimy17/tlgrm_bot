const Chat = require("../models/chat");
const Utils = require("../../utils/utils");
const Db = require("./db");
const ChatUsers = require("../models/chat_users");
const ChatUserImage = require("../models/chat_user_image");
const ChatUserDoc = require("../models/chat_user_doc");
const ChatUserVoice = require("../models/chat_user_voice");
const ChatUserVideo = require("../models/chat_user_video");
const ChatUserLocation = require("../models/chat_user_location");
const Telegram = require("../telegram");

class Message {
    constructor(from, chat) {
        this.user = from;
        this.chat = chat;
    }

    async telegram_chat_update(data) {
        let chat = await Chat.findOne({
            where: {
                chat_id: JSON.stringify(this.chat.id)
            }
        });
        if (chat) {
            chat.chat_id = data;
            if (this.chat.username) chat.chat_user = this.chat.username;
            chat.chat_type = this.chat.type;
            await chat.save();
            Utils.log(`Chat updated from ${this.chat.id} to ${chat.chat_id}`);
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
            }
            return;
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

    async telegram_update_chat_member(migrate) {
        if (migrate) {
            let chat_users = await ChatUsers.findAll({
                where: {
                    chat_id: JSON.stringify(this.chat.id)
                }
            });
            chat_users.map(async chat_user => {
                chat_user.chat_id = migrate;
                chat_user.save();
                Utils.log(
                    `[ChatUsers updated]`,
                    `user -> ${chat_user.telegram_id}`,
                    `migrate from ${this.chat.id} to ${chat_user.chat_id}`
                );
            });
        } else {
            let user = await new Telegram(this.chat).get_chat_member(this.user.id);
            let chat_user = await ChatUsers.findOne({
                where: {
                    chat_id: JSON.stringify(this.chat.id),
                    telegram_id: this.user.id
                }
            });
            if (chat_user) {
                if (chat_user.chat_user_status !== user.result.status) {
                    chat_user.chat_user_status = user.result.status;
                    chat_user.save();
                    Utils.log(`[ChatUsers updated]`, `user --> ${this.user.id}`);
                }
                return;
            } else {
                Utils.log(`[ChatUsers dont exist] creating ChatUsers`);
                let data = {};
                data.chat_id = this.chat.id;
                data.telegram_id = this.user.id;
                data.chat_user_status = user.result.status;
                ChatUsers.create(data);
                Utils.log(`[ChatUsers created]`, `user --> ${this.user.id}`);
            }
        }
        return;
    }

    async telegram_document(document) {
        let data = {
            telegram_id: this.user.id,
            chat_id: this.chat.id,
            file_name: document.file_name,
            file_type: document.mime_type,
            file_id: document.file_id,
            file_unique_id: document.file_unique_id
        };
        ChatUserDoc.create(data);
        Utils.log(
            `[ChatUserDoc created]`,
            `user --> ${this.user.id}`,
            `file_unique_id --> ${data.file_unique_id}`
        );
        return;
    }

    async telegram_image(image, caption) {
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

    async telegram_voice(voice) {
        let data = {
            telegram_id: this.user.id,
            chat_id: this.chat.id,
            duration: voice.duration,
            file_type: voice.mime_type,
            file_id: voice.file_id,
            file_unique_id: voice.file_unique_id
        };
        ChatUserVoice.create(data);
        Utils.log(
            `[ChatUserVoice created]`,
            `user_id--> ${this.user.id}`,
            `file_unique_id--> ${data.file_unique_id}`
        );
        return;
    }

    async telegram_video(video) {
        let data = {
            telegram_id: this.user.id,
            chat_id: this.chat.id,
            duration: video.duration,
            length: video.length,
            file_id: video.file_id,
            file_unique_id: video.file_unique_id
        };
        ChatUserVideo.create(data);
        Utils.log(
            `[ChatUserVideo created]`,
            `user_id--> ${this.user.id}`,
            `file_unique_id--> ${data.file_unique_id}`
        );
        return;
    }

    async telegram_media(media, payload) {
        switch (media) {
            case "image":
                let image = payload.photo[1];
                let caption = payload.caption ? payload.caption : null;
                await this.telegram_image(image, caption);
                return;
            case "voice":
                await this.telegram_voice(payload.voice);
                return;
            case "video_note":
                await this.telegram_video(payload.video_note);
                return;
        }
    }

    async telegram_location(location) {
        let data = {
            telegram_id: this.user.id,
            chat_id: this.chat.id,
            latitude: location.latitude,
            longitude: location.longitude
        };
        ChatUserLocation.create(data);
        Utils.log(`[ChatUserLocation created]`, `user_id--> ${this.user.id}`);
        return;
    }

    async additional_props(payload) {
        if (payload.group_chat_created) {
            return;
        } else if (payload.migrate_to_chat_id) {
            Utils.log(`Message has properties of "migrate_to_chat_id"`);
            await this.telegram_chat_update(payload.migrate_to_chat_id);
            await this.telegram_update_chat_member(payload.migrate_to_chat_id);
        } else if (payload.new_chat_member) {
            Utils.log(`Message has properties of "new_chat_member"`);
            await this.telegram_chat_new_member(payload.new_chat_member);
            await this.telegram_update_chat_member();
        } else if (payload.left_chat_member) {
            Utils.log(`Message has properties of "left_chat_member"`);
            await this.telegram_chat_left_member(payload.left_chat_member);
            return;
        } else if (payload.document) {
            Utils.log(`Message has properties of "document"`);
            await this.telegram_document(payload.document);
            await this.telegram_update_chat_member();
        } else if (payload.photo) {
            Utils.log(`Message has properties of "photo"`);
            await this.telegram_media("image", payload);
            await this.telegram_update_chat_member();
        } else if (payload.voice) {
            Utils.log(`Message has properties of "voice"`);
            await this.telegram_media("voice", payload);
            await this.telegram_update_chat_member();
        } else if (payload.video_note) {
            Utils.log(`Message has properties of "video note"`);
            await this.telegram_media("video_note", payload);
            await this.telegram_update_chat_member();
        } else if (payload.location) {
            Utils.log(`Message has properties of "location"`);
            await this.telegram_location(payload.location);
            await this.telegram_update_chat_member();
        } else {
            await this.telegram_update_chat_member();
        }
        return;
    }
}
module.exports = Message;
