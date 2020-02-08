const moment = require("moment");

class Utils {
    static log() {
        let timestamp = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
        console.log(`[${timestamp}]`, ...arguments);
    }
}

module.exports = Utils;
