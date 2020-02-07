const API = require("../services/api");
class Webhooks {
    async filter(payload) {
        if (payload.hasOwnProperty("message")) {
            let chat_type = payload.message.chat.type;
            if (chat_type === "private") {
                try {
                    new API(payload, payload.message.from).delete_message();
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log(payload);
            }
        } else if (payload.hasOwnProperty("callback_query")) {
        }
    }
}

module.exports = Webhooks;
