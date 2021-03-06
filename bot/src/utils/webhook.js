const API = require("../services/api");
const Db = require("../services/db/db");
const Message = require("../services/db/message");

class Webhooks {
    async filter(payload) {
        if (payload.hasOwnProperty("message")) {
            let { from, chat, text } = payload.message;
            await new Db(from, chat, text).processing_data(payload.message.message_id);
            await new Message(from, chat).additional_props(payload.message);
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
