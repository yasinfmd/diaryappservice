const imageDal = require("../../dataaccess/image/index")
const queryParser = require('../../utils/queryparser')
const fs = require('fs');
let imageService = {

    async update(request) {
        /*    const {urlparse, tech} = request.body;
            let where = queryParser.parseQuery(urlparse)
            const data = await techDal.update(tech, where)
            return data*/
    },
    async findById(imageId) {
        if (parseInt(imageId) > 0) {
            let data = await imageDal.show(imageId)
            return data
        } else {
            return []
        }
    },
    validation(type) {
    },
    async deleteFromStorage(path) {
        if (fs.existsSync(path)) {
            fs.unlink(path, (err) => {
                if (err) return false;
                return true
            });
        }
        return true
    },
    async delete(request) {

        const {urlparse} = request.body;
        let where = queryParser.parseQuery(urlparse)
        const data = await imageDal.delete(where)
        return data
    },
    async create(request) {
        //resim ekledikten sonra listeler url vs
        const data = await imageDal.create([{}])
        /*bulkcreate*/
        /*        const {name} = request.body
                const data = await techDal.create({name})
                return data*/
    },

    async all(request) {
        const {urlparse} = request.body;
        let where;
        if (urlparse === undefined || urlparse === null) {
            where = {};
        } else {
            where = queryParser.parseQuery(urlparse)
        }
        const data = await imageDal.all(where)
        return data
    }
}

module.exports = imageService
