const User = require("../services/models/user");
const DbLogs = require("./log");
const DbChats = require("./chat");
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

    async users() {
        let users = await User.findAll();
        if (users) {
            users = users.map(user => {
                return user.get();
            });
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
