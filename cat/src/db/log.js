const Log = require("../services/models/log");
const ChatUsers = require("../services/models/chat_users");
const { Op } = require("sequelize");

class DbLogs {
    constructor(telegram_id) {
        this.telegram_id = telegram_id;
    }

    async logs() {
        let chat_users = await ChatUsers.findAll({
            where: { telegram_id: this.telegram_id }
        });
        let logs = await Log.findAll({
            where: {
                telegram_id: this.telegram_id
            }
        });
        let chat_logs = chat_users.map(chat_user => {
            logs = logs.filter(e => e.chat_id == chat_user.chat_id);
            logs.map(log => {
                return log.get();
            });
            return { chat_id: chat_user.chat_id, logs };
        });
        return chat_logs;
    }

    async group_logs(id) {
        let logs = await Log.findAll({
            where: {
                chat_id: id
            }
        });
        if (logs) return logs;
    }
}

module.exports = DbLogs;
