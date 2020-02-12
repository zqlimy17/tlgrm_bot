const Log = require("../services/models/log");
const { Op } = require("sequelize");

class DbLogs {
    constructor(telegram_id) {
        this.telegram_id = telegram_id;
    }

    async logs() {
        let logs = await Log.findAll({
            where: {
                telegram_id: this.telegram_id
            }
        });
        if (logs) return logs;
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
