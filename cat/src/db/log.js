const Log = require("../services/models/log");
const ChatUsers = require("../services/models/chat_users");
const { Op } = require("sequelize");

class DbLogs {
    constructor(telegram_id) {
        this.telegram_id = telegram_id;
    }

    async group_logs(id, then, now) {
        let logs = await Log.findAll({
            where: {
                chat_id: id,
                created_at: {
                    [Op.between]: [then, now]
                }
            }
        });
        return logs;
    }
}

module.exports = DbLogs;
