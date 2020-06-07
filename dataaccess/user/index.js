const User = require('../../models/user')
const Dair = require('../../models/dair')
const Videos = require('../../models/video')
let UserDataAccess = {
    async delete(where) {
        const deleted = await User.deleteMany(where)
        return deleted
    },
    async update(where, updatedUser) {
        const user = await User.updateMany(where, updatedUser)
        return user
    },
    async show(where, fields, populate) {
        const user = await User.findOne(where).select(fields).populate(populate ? populate : null)
        return user
    },
    async create(userModel) {
        const user = await userModel.save();
        return user;
    },
    async all(where, fields, populate) {
        const users = await User.find(where).select(fields).populate(populate ? populate : null)
        return users
    }
}

module.exports = UserDataAccess;
