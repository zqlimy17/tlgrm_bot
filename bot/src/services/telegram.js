const fetch = require("node-fetch");
const config = require("config");
class Telegram {
    constructor(chat) {
        this.chat_id = chat.id;
    }

    async get_chat_creator() {
        let data = {
            chat_id: this.chat_id
        };
        return await this.execute_post("/getchatadministrators", data);
    }

    async get_chat_members_count() {
        let data = {
            chat_id: this.chat_id
        };
        return await this.execute_post("/getchatmemberscount", data);
    }

    async get_chat_member(telegram_id) {
        let data = {
            chat_id: this.chat_id,
            user_id: telegram_id
        };
        return await this.execute_post("/getchatmember", data);
    }
    async execute_post(path, data) {
        let resp = await fetch(`${config.get("default_API")}${path}`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return resp.json();
    }
}
module.exports = Telegram;
