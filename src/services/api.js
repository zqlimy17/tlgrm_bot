const fetch = require("node-fetch");
const config = require("config");

class API {
    constructor(payload, user) {
        this.name = user.username ? `@${user.username}` : user.first_name;
        this.chat_id = user.id;
        this.message_id = payload.message ? payload.message.message_id : payload.message_id;
    }

    async delete_message(menu_message_id) {
        let message_id = menu_message_id ? menu_message_id : this.message_id;
        let data = {
            chat_id: this.chat_id,
            message_id
        };
        let resp = this.execute_post("/deletemessage", data);
        return resp;
    }

    async send_message(text, reply_markup, parse_mode = "HTML") {
        let data = {
            chat_id: this.chat_id,
            text,
            parse_mode
        };
        if (reply_markup) data.reply_markup = reply_markup;
        let resp = this.execute_post("/sendmessage", data);
        return resp;
    }

    async edit_message(text, reply_markup, parse_mode = "HTML") {
        let data = {
            chat_id: this.chat_id,
            message_id: this.message_id,
            inline_message_id: this.message_id,
            text,
            parse_mode
        };
        if (reply_markup) data.reply_markup = reply_markup;
        return this.execute_post("/editmessagetext", data);
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

module.exports = API;
