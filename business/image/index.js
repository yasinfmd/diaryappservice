const imageDal = require("../../dataaccess/image/index")
const queryParser = require('../../utils/queryparser')
const multipleFileUpload = require('../../middleware/multipleimageuploads')

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
    async uploadFileFromStorage(req, res) {
        try {
            multipleFileUpload(req, res, function (error) {
                if (error) {
                    throw new Error(error.message)
                } else {
                    return req.files
                }
            })
        } catch (error) {
            throw new Error(error.message)
        }
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
    async create(request, response) {
        try {
            const files = await this.uploadFileFromStorage(request, response)
            let imgList = []
            files.forEach((image) => {
                imgList.push({
                    imageUri: process.env.HOST + image.destination + image.filename,
                    fileName: image.filename
                })
            })
            const data = await imageDal.create(imgList)
            return data
        } catch (error) {
            throw new Error(error.message)
        }
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
