const moment = require("moment");

class Utils {
    static log() {
        let timestamp = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
        console.log(`[${timestamp}]`, ...arguments);
    }

    static async reply_markup(keyboard) {
        return {
            resize_keyboard: true,
            one_time_keyboard: true,
            force_reply: true,
            inline_keyboard: keyboard
        };
    }
}

module.exports = Utils;
