const mongoose = require('mongoose');
const AuthToken = mongoose.model('AuthToken');

module.exports = {
    getPreviousAuthToken: async (userId) => {
        return await AuthToken.findOne({ userId: userId})
            .then(user => { if (user) return user; })
            .catch(err => console.log("Cannot find previous token in AuthToken dataset", err));

    },
    removeAuthTokensById: async (userId) => {
        return await AuthToken.deleteMany({ userId:  userId})
            .catch(err => console.log("Cannot remove token in AuthToken dataset", err));
    },
    createAuthToken: async (token, expires, userId) => {
        return await AuthToken.insertMany({
            token: token,
            expiredate: expires,
            userId: userId
        }).catch(err => console.log("Cannot add new token in AuthToken dataset", err))
    },

}