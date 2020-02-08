const User = require("../services/models/user");

class DbUsers {
    static async users() {
        let users = User.findAll();
        if (users) return users;
    }
}

module.exports = DbUsers;
