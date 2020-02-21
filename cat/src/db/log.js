const Log = require("../services/models/log");
// const ChatUsers = require("../services/models/chat_users");
const ChatVideos = require("../services/models/chat_user_video");
const ChatDocs = require("../services/models/chat_user_doc");
const ChatImages = require("../services/models/chat_user_image");
const ChatLocations = require("../services/models/chat_user_location");
const ChatVoices = require("../services/models/chat_user_voice");
const { Op } = require("sequelize");

class DbLogs {
    constructor(id, then, now) {
        this.chat_id = id;
        this.then = then ? then : null;
        this.now = now ? now : null;
    }

    async logs(id, telegram_id) {
        let logs = Log.findAll({
            where: {
                chat_id: id,
                telegram_id: telegram_id
            }
        });
        return logs;
    }

    async group_logs() {
        let logs;
        if (!this.then && !this.now) {
            logs = await Log.findAll({
                where: {
                    chat_id: this.chat_id
                },
                order: [["created_at", "ASC"]]
            });
        } else {
            logs = await Log.findAll({
                where: {
                    chat_id: this.chat_id,
                    created_at: {
                        [Op.between]: [this.then, this.now]
                    }
                },
                order: [["created_at", "ASC"]]
            });
        }

        let videos = await ChatVideos.findAll({
            where: { chat_id: this.chat_id }
        });
        let voices = await ChatVoices.findAll({
            where: { chat_id: this.chat_id }
        });
        let docs = await ChatDocs.findAll({
            where: { chat_id: this.chat_id }
        });
        let images = await ChatImages.findAll({
            where: { chat_id: this.chat_id }
        });
        let locations = await ChatLocations.findAll({
            where: { chat_id: this.chat_id }
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
    async group_media_length(id) {
        let logs = await Log.count({
            where: { chat_id: id }
        });
        let videos = await ChatVideos.count({
            where: { chat_id: id }
        });
        let voices = await ChatVoices.count({
            where: { chat_id: id }
        });
        let docs = await ChatDocs.count({
            where: { chat_id: id }
        });
        let images = await ChatImages.count({
            where: { chat_id: id }
        });
        let locations = await ChatLocations.count({
            where: { chat_id: id }
        });
        let count = logs + videos + voices + docs + images + locations;
        return count;
    }
}

module.exports = DbLogs;
