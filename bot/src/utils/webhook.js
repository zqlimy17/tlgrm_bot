const API = require("../services/api");
const Db = require("../services/db");

class Webhooks {
    async filter(payload) {
        if (payload.hasOwnProperty("message")) {
            let { from, chat, text } = payload.message;
            if (payload.message.hasOwnProperty("migrate_from_chat_id")) {
                let migrate_chat = payload.message.migrate_from_chat_id;
                await Db.telegram_chat_update(migrate_chat, chat);
            }
            new Db(from, chat, text).processing_data(payload.message.message_id);
            if (chat.type === "private") {
                try {
                    new API(payload, payload.message.from).delete_message();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

module.exports = Webhooks;
