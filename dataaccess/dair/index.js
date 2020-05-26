const User = require('../../models/user')
const Dair = require('../../models/dair')
const Videos = require('../../models/video')
let DairDataAccess = {
    async delete(where) {
        const deleted = await Dair.deleteMany(where)
        return deleted
    },
    async update(where, updatedUser) {
        const dair = await Dair.updateMany(where, updatedUser)
        return dair
        /*TODO*/
        /*      const updated = await Tech.update(techModel, {where: where})
              /!*return updated*!/
              const tech = await this.all(where)
              return tech[0]*/
    },
    async show(where, fields, populate) {
        const dair = await Dair.findOne(where).select(fields).populate(populate ? populate : null)
        return dair
    },
    async create(dairModel) {
        const dair = await dairModel.save();
        return dair;
    },
    async all(where, fields, populate) {
        const dairs = await Dair.find(where).select(fields).populate(populate ? populate : null)
        return dairs
    }
}

module.exports = DairDataAccess;
