const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Users = mongoose.model('User');

module.exports = {
    getPreciseUser: async function (username, password) {
        const user = await Users.findOne({username: username})

        if (!user) {
            return null;
        }

        const isPasswordMatch = user.password == password;
        //const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return null; 
        }

        return user;
    }
}