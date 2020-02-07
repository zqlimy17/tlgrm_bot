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
<<<<<<< HEAD
            } else {
                console.log(payload);
=======
>>>>>>> 1bf132d886bb8fad70185ebebbf873d1af3f9633
            }
        }
    }
}

module.exports = Webhooks;
