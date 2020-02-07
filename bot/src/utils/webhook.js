const API = require("../services/api");
const Db = require("../services/db");

class Webhooks {
    async filter(payload) {
        if (payload.hasOwnProperty("message")) {
            let { from, chat, text } = payload.message;
            new Db(from, chat, text).processing_data();
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
