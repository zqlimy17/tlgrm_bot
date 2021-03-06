const fetch = require("node-fetch");
const config = require("config");
class Telegram {
    constructor(chat) {
        this.chat_id = chat ? chat.id : null;
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

    async chat_profile(chat_id) {
        let data = {
            chat_id
        };
        let resp = await this.execute_post("/getchat", data);
        if (resp.result.photo) {
            data = {
                file_id: resp.result.photo.big_file_id
            };
            let photo_url = await this.execute_post("/getfile", data);
            resp = photo_url.result.file_path;
            return resp;
        } else {
            return resp;
        }
    }
    async user_profile(user_id) {
        let data = {
            user_id
        };
        let resp = await this.execute_post("/getuserprofilephotos", data);
        if (resp.result.photos) {
            data = {
                file_id: resp.result.photos[0][2].file_id
            };
            let photo_url = await this.execute_post("/getfile", data);
            resp = photo_url.result.file_path;
            return resp;
        } else {
            return resp;
        }
    }

    async media_image(id) {
        let resp = await this.execute_get(`/getFile?file_id=${id}`);
        return resp.result.file_path;
    }

    async execute_post(path, data) {
        let resp = await fetch(`${config.get("default_API")}${path}`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return resp.json();
    }

    async execute_get(path) {
        let resp = await fetch(`${config.get("default_API")}${path}`, {
            method: "get"
        });
        return resp.json();
    }
}
module.exports = Telegram;
