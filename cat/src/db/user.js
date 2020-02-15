const User = require("../services/models/user");
const DbLogs = require("./log");
const DbChats = require("./chat");
const ChatUsers = require("../services/models/chat_users");
const ChatVideos = require("../services/models/chat_user_video");
const ChatDocs = require("../services/models/chat_user_doc");
const ChatImages = require("../services/models/chat_user_image");
const ChatLocations = require("../services/models/chat_user_location");
const ChatVoices = require("../services/models/chat_user_voice");
const { Op } = require("sequelize");

class DbUsers {
    constructor(telegram_id) {
        this.telegram_id = telegram_id;
    }

    async user() {
        let user = await User.findOne({
            where: {
                telegram_id: this.telegram_id
            }
        });
        if (user) {
            user = user.get();
            return user;
        }
        return;
    }

    async users(id) {
        let users = await ChatUsers.findAll({
            where: {
                chat_id: id
            }
        });
        if (users) {
            users = users.map(async user => {
                let u = await User.findOne({
                    where: {
                        telegram_id: user.telegram_id
                    }
                });

                let l = await new DbLogs().logs(id, user.telegram_id);
                l = l.map(log => {
                    return log.get;
                });

                let video = await ChatVideos.findAll({
                    where: {
                        chat_id: id,
                        telegram_id: user.telegram_id
                    }
                });

                let voice = await ChatVoices.findAll({
                    where: {
                        chat_id: id,

                        telegram_id: user.telegram_id
                    }
                });
                let doc = await ChatDocs.findAll({
                    where: {
                        chat_id: id,

                        telegram_id: user.telegram_id
                    }
                });
                let image = await ChatImages.findAll({
                    where: {
                        chat_id: id,

                        telegram_id: user.telegram_id
                    }
                });
                let loc = await ChatLocations.findAll({
                    where: {
                        chat_id: id,

                        telegram_id: user.telegram_id
                    }
                });

                user = user.get();
                user[`first_name`] = u.first_name;
                user[`last_name`] = u.last_name;
                user[`username`] = u.username;
                user[`log_count`] = l.length;
                user[`video_count`] = video.length;
                user[`voice_count`] = voice.length;
                user[`location_count`] = loc.length;
                user[`image_count`] = image.length;
                user[`doc_count`] = doc.length;
                return user;
            });
            users = await Promise.all(users);
        }
        return users;
    }

    async users_logs() {
        let users = await User.findAll();
        if (users) {
            users = users.map(async user => {
                let logs = await new DbLogs(user.telegram_id).logs();
                logs = logs.map(log => {
                    return log.get();
                });
                user = user.get();
                user[`log_count`] = logs.length;
                user[`logs`] = logs;
                return user;
            });
            users = await Promise.all(users);
        }
        return users;
    }

    async users_chats() {
        let users = await User.findAll();
        if (users) {
            users = users.map(async user => {
                let chats = await new DbChats(user.telegram_id).chats();
                chats = chats.map(chat => {
                    return chat.get();
                });
                user = user.get();
                user[`chat_count`] = chats.length;
                user[`chats`] = chats;
                return user;
            });
            users = await Promise.all(users);
        }
        return users;
    }
}

module.exports = DbUsers;
