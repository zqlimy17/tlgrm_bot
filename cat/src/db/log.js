const Log = require("../services/models/log");
// const ChatUsers = require("../services/models/chat_users");
const ChatVideos = require("../services/models/chat_user_video");
const ChatDocs = require("../services/models/chat_user_doc");
const ChatImages = require("../services/models/chat_user_image");
const ChatLocations = require("../services/models/chat_user_location");
const ChatVoices = require("../services/models/chat_user_voice");
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

        let videos = await ChatVideos.findAll({
            where: { chat_id: id }
        });
        let voices = await ChatVoices.findAll({
            where: { chat_id: id }
        });
        let docs = await ChatDocs.findAll({
            where: { chat_id: id }
        });
        let images = await ChatImages.findAll({
            where: { chat_id: id }
        });
        let locations = await ChatLocations.findAll({
            where: { chat_id: id }
        });
        let media = {
            logs,
            videos,
            voices,
            docs,
            images,
            locations
        };

        return media;
    }
}

module.exports = DbLogs;
